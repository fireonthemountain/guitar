#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SUPPORTED_EXTENSIONS = new Set([
  '.pdf', '.epub', '.mobi', '.azw', '.azw3', '.cbz', '.txt', '.md',
]);

export function canonicalTitle(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/^[0-9a-f][0-9a-f-]{20,}_+/i, '')
    .replace(/\s*\(\d+\)\s*$/i, '')
    .replace(/_+|\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function classifySource(filePath) {
  const text = filePath.toLowerCase();
  if (/fingerstyle|fingerpicking|travis/.test(text)) return 'fingerstyle';
  if (/caged|uncaged|fretboard/.test(text)) return 'fretboard';
  if (/blues|pentatonic/.test(text)) return 'blues';
  if (/songbook|songs?|campfire/.test(text)) return 'songbook';
  if (/theory|harmony|chord/.test(text)) return 'theory';
  if (/trick|embellishment|technique/.test(text)) return 'technique';
  return 'unclassified';
}

async function walk(root) {
  const found = [];
  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return found;
    throw error;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) found.push(...await walk(fullPath));
    else if (entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) found.push(fullPath);
  }
  return found;
}

async function sha256(filePath) {
  return createHash('sha256').update(await readFile(filePath)).digest('hex');
}

function pdfPages(filePath) {
  if (path.extname(filePath).toLowerCase() !== '.pdf') return null;
  try {
    const output = execFileSync('pdfinfo', [filePath], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const match = output.match(/^Pages:\s+(\d+)$/m);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

export async function buildInventory(sourceRoots) {
  const uniqueRoots = [...new Set(sourceRoots.map((root) => path.resolve(root)))];
  const paths = (await Promise.all(uniqueRoots.map(walk))).flat().sort();
  const files = [];

  for (const filePath of paths) {
    const info = await stat(filePath);
    files.push({
      id: await sha256(filePath),
      path: filePath,
      filename: path.basename(filePath),
      canonicalTitle: canonicalTitle(filePath),
      format: path.extname(filePath).slice(1).toLowerCase(),
      category: classifySource(filePath),
      bytes: info.size,
      modifiedAt: info.mtime.toISOString(),
      pages: pdfPages(filePath),
    });
  }

  const byHash = new Map();
  for (const file of files) {
    const group = byHash.get(file.id) || [];
    group.push(file.path);
    byHash.set(file.id, group);
  }
  const duplicateGroups = [...byHash.entries()]
    .filter(([, members]) => members.length > 1)
    .map(([sha256Hash, members]) => ({ sha256: sha256Hash, files: members }))
    .sort((a, b) => a.files[0].localeCompare(b.files[0]));

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    sourceRoots: uniqueRoots,
    totals: {
      files: files.length,
      bytes: files.reduce((sum, file) => sum + file.bytes, 0),
      exactDuplicateGroups: duplicateGroups.length,
    },
    files,
    duplicateGroups,
  };
}

function parseArgs(argv) {
  const sources = [];
  let output = path.resolve('private-data/guitar-library-inventory.json');
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--source' && argv[index + 1]) sources.push(argv[++index]);
    else if (argv[index] === '--output' && argv[index + 1]) output = path.resolve(argv[++index]);
    else throw new Error(`Unknown or incomplete argument: ${argv[index]}`);
  }
  if (!sources.length) {
    sources.push(
      '/Users/csather/Documents/Guitar Library',
      '/Users/csather/Documents/Guitar',
    );
  }
  return { sources, output };
}

export async function main(argv = process.argv.slice(2)) {
  const { sources, output } = parseArgs(argv);
  const inventory = await buildInventory(sources);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
  process.stdout.write(`Inventoried ${inventory.totals.files} files; ${inventory.totals.exactDuplicateGroups} exact duplicate groups.\n`);
  process.stdout.write(`Private manifest: ${output}\n`);
  return inventory;
}

const isDirect = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirect) {
  main().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
  });
}
