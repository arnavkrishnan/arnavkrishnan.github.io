import { useMemo, useState, useEffect, useRef } from 'react';

/*
 * ZeroForcingFigure
 * Draws a generalized Petersen graph P(n,k) and animates the zero-forcing
 * cascade from a chosen starting set of black vertices.
 *
 * Props:
 *   n, k          graph parameters
 *   start         array of vertex ids, e.g. ["u0","u1","v3"]
 *   editable      if true, clicking a vertex toggles it in/out of the start set
 *   caption       optional caption below the figure
 *   height        svg height in px (default 340)
 *   showLabels    show u_i / v_i labels (default false)
 */

// vertex id helpers
const vid = (t, i) => `${t}${i}`;

function buildGraph(n, k) {
  const nodes = [];
  const adj = {};
  const add = (t, i) => {
    const id = vid(t, i);
    nodes.push({ id, t, i });
    adj[id] = new Set();
  };
  for (let i = 0; i < n; i++) add('u', i);
  for (let i = 0; i < n; i++) add('v', i);
  const e = (a, b) => {
    adj[a].add(b);
    adj[b].add(a);
  };
  for (let i = 0; i < n; i++) {
    e(vid('u', i), vid('u', (i + 1) % n));
    e(vid('u', i), vid('v', i));
    e(vid('v', i), vid('v', (i + k) % n));
  }
  return { nodes, adj };
}

// synchronous forcing rounds; returns array of Sets (cumulative black after each round)
function cascadeRounds(adj, start) {
  const black = new Set(start);
  const snaps = [new Set(black)];
  let guard = 0;
  while (guard++ < 10000) {
    const toAdd = [];
    for (const x of black) {
      const white = [...adj[x]].filter((y) => !black.has(y));
      if (white.length === 1) toAdd.push(white[0]);
    }
    const fresh = toAdd.filter((y) => !black.has(y));
    if (fresh.length === 0) break;
    for (const y of fresh) black.add(y);
    snaps.push(new Set(black));
  }
  return snaps;
}

function layout(n, k, W, H) {
  const cx = W / 2;
  const cy = H / 2;
  const Ro = Math.min(W, H) * 0.4;
  const Ri = Ro * 0.56;
  const pos = {};
  for (let i = 0; i < n; i++) {
    const a = ((90 - (360 * i) / n) * Math.PI) / 180;
    pos[vid('u', i)] = [cx + Ro * Math.cos(a), cy - Ro * Math.sin(a)];
    pos[vid('v', i)] = [cx + Ri * Math.cos(a), cy - Ri * Math.sin(a)];
  }
  return { pos, cx, cy, Ro, Ri };
}

const ACCENT = '#c0392b'; // warm red for "just forced"

export default function ZeroForcingFigure({
  n = 12,
  k = 3,
  start = [],
  editable = false,
  caption = '',
  height = 340,
  showLabels = false,
}) {
  const W = 460;
  const H = height;
  const { nodes, adj } = useMemo(() => buildGraph(n, k), [n, k]);
  const { pos } = useMemo(() => layout(n, k, W, H), [n, k, H]);

  const [startSet, setStartSet] = useState(() => new Set(start));
  useEffect(() => {
    setStartSet(new Set(start));
  }, [start.join(','), n, k]);

  const snaps = useMemo(
    () => cascadeRounds(adj, [...startSet]),
    [adj, startSet],
  );
  const [round, setRound] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  // clamp round when snaps change
  useEffect(() => {
    setRound((r) => Math.min(r, snaps.length - 1));
  }, [snaps.length]);

  useEffect(() => {
    if (!playing) return;
    if (round >= snaps.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setRound((r) => r + 1), 750);
    return () => clearTimeout(timer.current);
  }, [playing, round, snaps.length]);

  const blackNow = snaps[round] || new Set();
  const blackPrev = round > 0 ? snaps[round - 1] : new Set();
  const done = blackNow.size === nodes.length;
  const fresh = (id) =>
    round > 0 && round < snaps.length - 1 && blackNow.has(id) && !blackPrev.has(id);

  const edges = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const a of Object.keys(adj)) {
      for (const b of adj[a]) {
        const key = a < b ? `${a}|${b}` : `${b}|${a}`;
        if (seen.has(key)) continue;
        seen.add(key);
        list.push([a, b]);
      }
    }
    return list;
  }, [adj]);

  const toggle = (id) => {
    if (!editable) return;
    setPlaying(false);
    setRound(0);
    setStartSet((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setPlaying(false);
    setRound(0);
  };

  return (
    <figure className="zf-fig">
      <svg viewBox={`0 0 ${W} ${H}`} className="zf-svg" role="img">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={pos[a][0]}
            y1={pos[a][1]}
            x2={pos[b][0]}
            y2={pos[b][1]}
            stroke="#bbb"
            strokeWidth="1.4"
          />
        ))}
        {nodes.map((nd) => {
          const [x, y] = pos[nd.id];
          const isBlack = blackNow.has(nd.id);
          const isFresh = fresh(nd.id);
          return (
            <g
              key={nd.id}
              onClick={() => toggle(nd.id)}
              style={{ cursor: editable ? 'pointer' : 'default' }}
            >
              {isFresh && (
                <circle cx={x} cy={y} r="11.5" fill="none" stroke={ACCENT} strokeWidth="2.2" />
              )}
              <circle
                cx={x}
                cy={y}
                r="6.5"
                fill={isBlack ? (isFresh ? ACCENT : '#111') : '#fff'}
                stroke={isBlack ? (isFresh ? ACCENT : '#111') : '#333'}
                strokeWidth="1.6"
              />
              {showLabels && (
                <text
                  x={x}
                  y={y - 11}
                  fontSize="9"
                  textAnchor="middle"
                  fill="#777"
                >
                  {nd.t}
                  {nd.i}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="zf-controls">
        <button onClick={() => setPlaying((p) => !p)} disabled={done && round === snaps.length - 1}>
          {playing ? 'Pause' : round >= snaps.length - 1 ? 'Replay' : 'Play'}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setRound((r) => Math.max(0, r - 1));
          }}
          disabled={round === 0}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setRound((r) => Math.min(snaps.length - 1, r + 1));
          }}
          disabled={round >= snaps.length - 1}
        >
          Next
        </button>
        <button onClick={reset} disabled={round === 0 && !playing}>
          Reset
        </button>
        <span className="zf-status">
          {round === 0 ? 'Start' : `Round ${round}`} &middot; {blackNow.size}/{nodes.length} filled
          {done && round === snaps.length - 1 ? ' ✓' : ''}
        </span>
      </div>
      {editable && (
        <p className="zf-hint">Tip: click any vertex to add or remove it from the starting set.</p>
      )}
      {caption && <figcaption className="zf-cap">{caption}</figcaption>}

      <style>{`
        .zf-fig { margin: 1.75rem 0; text-align: center; }
        .zf-svg { width: 100%; max-width: 460px; height: auto; display: block; margin: 0 auto; }
        .zf-controls {
          display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center;
          justify-content: center; margin-top: 0.6rem;
        }
        .zf-controls button {
          font: inherit; font-size: 0.82rem; padding: 0.28rem 0.7rem;
          border: 1px solid #ccc; background: #fafafa; border-radius: 5px;
          cursor: pointer; color: #222;
        }
        .zf-controls button:hover:not(:disabled) { border-color: #888; background: #f0f0f0; }
        .zf-controls button:disabled { opacity: 0.4; cursor: default; }
        .zf-status { font-size: 0.8rem; color: #555; margin-left: 0.35rem; }
        .zf-hint { font-size: 0.78rem; color: #777; font-style: italic; margin: 0.4rem 0 0; }
        .zf-cap {
          font-size: 0.85rem; color: #555; margin-top: 0.65rem;
          max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.5;
        }
      `}</style>
    </figure>
  );
}
