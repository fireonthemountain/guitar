import { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  Check,
  Flame,
  Gauge,
  Guitar,
  Headphones,
  Library,
  Monitor,
  Music2,
  Play,
  Smartphone,
  Timer,
  Upload,
} from 'lucide-react';

const practiceItems = [
  { title: 'Finger independence', detail: '1–2–3–4 chromatic · clean and relaxed', time: '5 min', done: true },
  { title: 'Fingerpicking pattern', detail: ['P', 'i', 'm', 'a', 'm', 'i'], time: '5 min' },
  { title: 'Strumming groove', detail: ['↓', '↓', '↑', '↑', '↓', '↑'], time: '10 min' },
  { title: 'G → Cadd9 → D changes', detail: '8 clean loops · target 76 BPM', time: '10 min' },
  { title: 'Song: Stand By Me', detail: 'Verse and chorus · no stops', time: '10 min' },
];

function ViewToggle({ device, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-gray-700 bg-gray-950/70 p-1" aria-label="Mockup device">
      {[
        { id: 'desktop', label: 'Desktop', Icon: Monitor },
        { id: 'phone', label: 'Phone', Icon: Smartphone },
      ].map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={device === id}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            device === id ? 'bg-teal-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
}

function MockupHeading({ label, description, accent }) {
  return (
    <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h2 className={`text-lg font-bold ${accent}`}>{label}</h2>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function Frame({ children, phone = false }) {
  return (
    <div
      className={`overflow-hidden border border-gray-700 bg-[#101615] shadow-2xl shadow-black/30 ${
        phone ? 'mx-auto min-h-[650px] max-w-[360px] rounded-[2rem]' : 'min-h-[540px] rounded-2xl'
      }`}
    >
      {children}
    </div>
  );
}

function CurrentDesktop() {
  return (
    <Frame>
      <div className="flex h-16 items-center gap-5 border-b border-gray-700 bg-gray-800 px-5">
        <div className="shrink-0 font-bold text-teal-400">🎸 Guitar Practice</div>
        <div className="flex min-w-0 gap-1 overflow-hidden rounded-lg bg-gray-900/70 p-1 text-[11px] font-semibold text-gray-400">
          {['Program', 'Assessment', 'Jam Along', 'Songbook', 'Import', 'Amp'].map((item, index) => (
            <span key={item} className={`whitespace-nowrap rounded px-2.5 py-1.5 ${index === 0 ? 'bg-teal-600 text-white' : ''}`}>{item}</span>
          ))}
        </div>
        <span className="ml-auto shrink-0 text-[10px] text-amber-300">● Local only</span>
      </div>

      <div className="p-5">
        <div className="flex items-end justify-between gap-6 rounded-xl bg-gradient-to-r from-teal-950 to-teal-800 p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-teal-200/70">Stage 90 program</p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Ninety-Eight Days to Stage Ready</h3>
            <p className="mt-2 text-xs text-teal-100/60">A complete path from daily fundamentals to confident performance.</p>
          </div>
          <div className="w-44 shrink-0 text-right">
            <strong className="text-xl text-white">Day 8 of 98</strong>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20"><span className="block h-full w-[8%] bg-amber-300" /></div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,2fr)_minmax(180px,1fr)] gap-4">
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Today · Week 2</p>
            <h4 className="mt-1 text-lg font-bold">Warmup</h4>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="min-h-32 rounded-lg bg-gray-900 p-4">
                <strong className="text-sm">Fingerpicking</strong>
                <p className="mt-3 text-xs leading-6 text-gray-400">P · i · m · a<br />Keep your thumb steady on the bass notes.<br /><span className="text-amber-300">60 BPM · 5 minutes</span></p>
              </div>
              <div className="min-h-32 rounded-lg bg-gray-900 p-4">
                <strong className="text-sm">Strumming</strong>
                <p className="mt-3 text-xs leading-6 text-gray-400">D D U U D U<br />Count: 1 + 2 + 3 + 4 +<br /><span className="text-amber-300">72 BPM · 5 minutes</span></p>
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-gray-700 p-3">
              <div className="text-xs font-semibold">This week’s charts</div>
              <div className="mt-3 flex h-6 items-end gap-1.5">
                {[55, 82, 46, 68, 91, 38, 60].map((height, index) => <span key={index} className={`flex-1 rounded-sm ${index === 4 ? 'bg-amber-400/70' : 'bg-teal-700/60'}`} style={{ height: `${height}%` }} />)}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Session</p>
            <h4 className="mt-1 text-lg font-bold">Practice steps</h4>
            <div className="mt-3 space-y-2 text-xs">
              {['Warmup', 'Chord changes', 'Song work', 'Performance run'].map((item, index) => (
                <div key={item} className="flex justify-between rounded-lg bg-gray-900 px-3 py-3"><span>{item}</span><span className="text-amber-300">{[10, 10, 15, 5][index]} min</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function SideNavItem({ Icon, children, active, meta }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs ${active ? 'bg-teal-700 font-bold text-white' : 'text-teal-100/60'}`}>
      <Icon size={15} />
      <span>{children}</span>
      {meta && <span className="ml-auto text-[9px] text-teal-200/70">{meta}</span>}
    </div>
  );
}

function PracticeList({ compact = false }) {
  return (
    <div className={`overflow-hidden border border-gray-700 bg-gray-800 ${compact ? 'rounded-xl' : 'rounded-xl'}`}>
      {!compact && (
        <div className="flex justify-between border-b border-gray-700 px-4 py-3 text-xs">
          <strong>Today’s practice</strong>
          <span className="text-gray-400">8 of 40 min</span>
        </div>
      )}
      {practiceItems.map((item, index) => (
        <div key={item.title} className={`grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 border-b border-gray-700/70 px-4 ${compact ? 'py-3' : 'py-3.5'} last:border-0`}>
          <span className={`grid h-6 w-6 place-items-center rounded-full border text-[10px] font-bold ${item.done ? 'border-emerald-700 bg-emerald-900/60 text-emerald-300' : 'border-gray-600 text-gray-400'}`}>
            {item.done ? <Check size={13} /> : index + 1}
          </span>
          <div className="min-w-0">
            <strong className="block truncate text-xs text-gray-100">{item.title}</strong>
            {Array.isArray(item.detail) ? (
              <div className="mt-1.5 flex gap-1">{item.detail.map((mark, markIndex) => <span key={`${mark}-${markIndex}`} className="min-w-6 rounded bg-teal-950 px-1.5 py-0.5 text-center text-[10px] font-bold text-teal-300">{mark}</span>)}</div>
            ) : <span className="mt-1 block truncate text-[10px] text-gray-400">{item.detail}</span>}
          </div>
          <span className="text-[10px] text-gray-500">{item.done ? 'Done' : item.time}</span>
        </div>
      ))}
    </div>
  );
}

function FutureDesktop() {
  return (
    <Frame>
      <div className="grid min-h-[540px] grid-cols-[180px_minmax(0,1fr)]">
        <aside className="flex flex-col bg-[#0d3029] p-3 text-white">
          <div className="flex items-center gap-2 px-2 py-3 font-extrabold"><span className="grid h-8 w-7 place-items-center rounded-[45%] bg-teal-300 text-xs text-teal-950">G</span> Guitar Desk</div>
          <p className="mb-1 mt-4 px-3 text-[9px] font-bold tracking-[.16em] text-teal-200/40">PRACTICE</p>
          <SideNavItem Icon={Gauge} active meta="40m">Today</SideNavItem>
          <SideNavItem Icon={Music2}>Songs</SideNavItem>
          <SideNavItem Icon={BookOpen}>Courses</SideNavItem>
          <p className="mb-1 mt-4 px-3 text-[9px] font-bold tracking-[.16em] text-teal-200/40">YOUR MUSIC</p>
          <SideNavItem Icon={Library}>Library</SideNavItem>
          <SideNavItem Icon={Upload}>Import</SideNavItem>
          <SideNavItem Icon={BarChart3}>Progress</SideNavItem>
          <p className="mb-1 mt-4 px-3 text-[9px] font-bold tracking-[.16em] text-teal-200/40">TOOLS</p>
          <SideNavItem Icon={Headphones}>Jam</SideNavItem>
          <SideNavItem Icon={Guitar}>Amp</SideNavItem>
          <p className="mt-auto px-3 pb-2 text-[9px] text-teal-200/50">● Progress saved on this Mac</p>
        </aside>

        <div className="min-w-0 bg-[#111615]">
          <div className="flex h-16 items-center justify-between border-b border-gray-700 bg-[#171d1b] px-6"><strong>Today</strong><span className="text-[10px] text-gray-400">Tuesday, September 16 · Week 2</span></div>
          <div className="p-5">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-teal-400">Day 8 · Foundations</p><h3 className="mt-1 text-3xl font-black tracking-tight">Build a steady groove</h3><p className="mt-1 text-xs text-gray-400">40 minutes · 5 exercises · Last session: 72 BPM</p></div>
              <button type="button" className="flex shrink-0 items-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-teal-950/40"><Play size={14} fill="currentColor" /> Start practice</button>
            </div>
            <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(190px,.7fr)] gap-4">
              <PracticeList />
              <div className="space-y-3">
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold"><Flame size={15} className="text-amber-400" /> This week</div>
                  <div className="mt-4 flex h-12 items-end gap-1.5">{[65, 80, 100, 28, 28, 28, 28].map((height, index) => <span key={index} className={`flex-1 rounded-t ${index < 3 ? 'bg-teal-500' : 'bg-gray-700'}`} style={{ height: `${height}%` }} />)}</div>
                  <div className="mt-3 flex justify-between border-t border-gray-700 pt-3 text-[10px] text-gray-400"><span>3-day streak</span><strong className="text-gray-200">68 min</strong></div>
                </div>
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold"><Timer size={15} className="text-teal-400" /> Tempo trend</div>
                  <div className="mt-3 text-3xl font-black">72 <span className="text-[10px] font-medium text-gray-400">BPM clean</span></div>
                  <div className="mt-3 flex justify-between border-t border-gray-700 pt-3 text-[10px] text-gray-400"><span>Next target</span><strong className="text-amber-300">76 BPM</strong></div>
                </div>
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 text-[10px]">
                  <strong className="text-xs">Stage goal</strong>
                  <div className="mt-3 flex justify-between text-gray-400"><span>Set readiness</span><b className="text-gray-200">22%</b></div>
                  <div className="mt-2 flex justify-between text-gray-400"><span>Songs playable</span><b className="text-gray-200">2 of 8</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function CurrentPhone() {
  return (
    <Frame phone>
      <div className="px-5 pt-3 text-right text-[9px] text-gray-500">9:41</div>
      <div className="flex items-center justify-between px-5 py-3"><strong className="text-sm text-teal-400">🎸 Guitar Practice</strong><span className="text-[9px] text-amber-300">● Local</span></div>
      <div className="flex gap-5 overflow-hidden border-y border-gray-700 px-5 py-3 text-[10px] font-semibold text-gray-400"><b className="text-teal-400">Program</b><span>Assessment</span><span>Jam Along</span><span>Songbook</span></div>
      <div className="p-4">
        <div className="rounded-xl bg-gradient-to-br from-teal-950 to-teal-800 p-5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-teal-200/60">Stage 90 program</p>
          <h3 className="mt-2 text-2xl font-black leading-tight">Ninety-Eight Days to Stage Ready</h3>
          <p className="mt-2 text-[10px] text-teal-100/60">A complete path to confident performance.</p>
          <div className="mt-5"><strong>Day 8 of 98</strong><div className="mt-2 h-1.5 rounded-full bg-white/20"><span className="block h-full w-[8%] bg-amber-300" /></div></div>
        </div>
        <div className="mt-3 rounded-xl border border-gray-700 bg-gray-800 p-4"><h4 className="font-bold">Warmup</h4><div className="mt-3 rounded-lg bg-gray-900 p-4 text-xs leading-6 text-gray-400"><b className="text-gray-200">Fingerpicking</b><br />P · i · m · a<br />60 BPM · 5 minutes</div></div>
        <div className="mt-3 rounded-xl border border-gray-700 bg-gray-800 p-4"><h4 className="text-sm font-bold">This week’s charts</h4><div className="mt-3 flex h-7 items-end gap-1.5">{[55, 82, 46, 68, 91, 38].map((height, index) => <span key={index} className="flex-1 rounded-sm bg-teal-700/60" style={{ height: `${height}%` }} />)}</div></div>
      </div>
    </Frame>
  );
}

function FuturePhone() {
  return (
    <Frame phone>
      <div className="px-5 pt-3 text-right text-[9px] text-gray-500">9:41</div>
      <div className="flex items-center justify-between px-5 py-3"><strong className="text-sm">Today</strong><span className="text-[9px] text-emerald-300">● Saved</span></div>
      <div className="px-5 pb-5 pt-2"><p className="text-[9px] font-bold uppercase tracking-widest text-teal-400">Day 8 · 40 minutes</p><h3 className="mt-1 text-2xl font-black tracking-tight">Build a steady groove</h3><p className="mt-1 text-[10px] text-gray-400">Pick up where you left off · 72 BPM</p></div>
      <div className="px-4"><PracticeList compact /></div>
      <button type="button" className="mx-4 mt-4 flex w-[calc(100%_-_2rem)] items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-xs font-bold text-white"><Play size={14} fill="currentColor" /> Continue practice</button>
      <nav className="mt-5 grid grid-cols-4 border-t border-gray-700 bg-gray-800/95 px-2 pb-4 pt-3 text-center text-[9px] text-gray-400">
        <span className="text-teal-300"><Gauge size={17} className="mx-auto mb-1" />Today</span>
        <span><Music2 size={17} className="mx-auto mb-1" />Songs</span>
        <span><Library size={17} className="mx-auto mb-1" />Library</span>
        <span><BarChart3 size={17} className="mx-auto mb-1" />Progress</span>
      </nav>
    </Frame>
  );
}

export default function DesignPreviewPage() {
  const [device, setDevice] = useState('desktop');

  return (
    <div className="mx-auto max-w-[1450px]">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-400">Design comparison</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Current app vs. Practice Desk</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">Compare the existing program-first layout with a daily-practice workspace that makes the next action, lesson sequence, and progress easier to scan.</p>
        </div>
        <ViewToggle device={device} onChange={setDevice} />
      </div>

      {device === 'desktop' ? (
        <div className="space-y-9">
          <section><MockupHeading label="Current — program page" accent="text-gray-300" description="Rich lesson detail, but the hierarchy and navigation compete for attention" /><CurrentDesktop /></section>
          <section><MockupHeading label="Could be — daily Practice Desk" accent="text-teal-300" description="One obvious next action with coaching context beside the work" /><FutureDesktop /></section>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <section><MockupHeading label="Current" accent="text-gray-300" description="Desktop navigation compressed into a phone" /><CurrentPhone /></section>
          <section><MockupHeading label="Could be" accent="text-teal-300" description="Focused session with thumb-friendly navigation" /><FuturePhone /></section>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-teal-900/80 bg-teal-950/30 p-4 text-sm text-teal-100/80">
        <strong className="text-teal-300">Recommended direction:</strong> keep the existing lesson engine and saved progress, then replace the outer navigation and program landing screen with the Practice Desk structure.
      </div>
    </div>
  );
}
