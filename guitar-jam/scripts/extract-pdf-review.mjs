#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function detectChapter(text) {
  const match = text.match(/\bChapter\s+(\d+)\b/i);
  return match ? Number(match[1]) : null;
}

export function safeSlug(filename) {
  return path.basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function command(name, args) {
  return execFileSync(name, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function pageCount(pdfPath) {
  const info = command('pdfinfo', [pdfPath]);
  const match = info.match(/^Pages:\s+(\d+)$/m);
  if (!match) throw new Error(`Could not determine page count for ${pdfPath}`);
  return Number(match[1]);
}

async function sha256(filePath) {
  return createHash('sha256').update(await readFile(filePath)).digest('hex');
}

export async function extractReviewPackage(pdfPath, outputRoot) {
  const absolutePdf = path.resolve(pdfPath);
  if (path.extname(absolutePdf).toLowerCase() !== '.pdf') throw new Error('Review extraction currently supports PDF files only.');
  const sourceId = await sha256(absolutePdf);
  const destination = path.join(path.resolve(outputRoot), safeSlug(absolutePdf));
  const pagesDirectory = path.join(destination, 'pages');
  await mkdir(pagesDirectory, { recursive: true });

  const pages = [];
  const totalPages = pageCount(absolutePdf);
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    const stem = `page-${String(pageNumber).padStart(3, '0')}`;
    const textPath = path.join(pagesDirectory, `${stem}.txt`);
    const imagePrefix = path.join(pagesDirectory, stem);
    const text = command('pdftotext', ['-f', String(pageNumber), '-l', String(pageNumber), '-layout', absolutePdf, '-']).trim();
    command('pdftoppm', ['-f', String(pageNumber), '-l', String(pageNumber), '-singlefile', '-jpeg', '-r', '144', absolutePdf, imagePrefix]);
    await writeFile(textPath, `${text}\n`, 'utf8');
    pages.push({
      page: pageNumber,
      chapter: detectChapter(text),
      textFile: path.relative(destination, textPath),
      imageFile: path.relative(destination, `${imagePrefix}.jpg`),
      reviewStatus: 'pending',
    });
  }

  const manifest = {
    schemaVersion: 1,
    sourceId,
    sourcePath: absolutePdf,
    title: path.basename(absolutePdf, path.extname(absolutePdf)),
    extractedAt: new Date().toISOString(),
    pageCount: totalPages,
    usage: 'private-reference',
    publicationApproved: false,
    pages,
  };
  await writeFile(path.join(destination, 'review-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return { destination, manifest };
}

function parseArgs(argv) {
  let pdfPath = '';
  let output = path.resolve('private-data/review');
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--file' && argv[index + 1]) pdfPath = argv[++index];
    else if (argv[index] === '--output' && argv[index + 1]) output = argv[++index];
    else throw new Error(`Unknown or incomplete argument: ${argv[index]}`);
  }
  if (!pdfPath) throw new Error('Usage: npm run extract:review -- --file /absolute/path/to/source.pdf');
  return { pdfPath, output };
}

export async function main(argv = process.argv.slice(2)) {
  const { pdfPath, output } = parseArgs(argv);
  const result = await extractReviewPackage(pdfPath, output);
  process.stdout.write(`Extracted ${result.manifest.pageCount} pages for private review.\n`);
  process.stdout.write(`Review package: ${result.destination}\n`);
  return result;
}

const isDirect = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirect) {
  main().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
  });
}
