import { useEffect, useRef } from 'react'

const AXES = ['Health', 'Money', 'Freedom', 'Relationships', 'Faith'] as const

// ---- geometry (SVG user units) ----
const VB_W = 700
const VB_H = 600
const CX = 350
const CY = 300
const R = 196
const GRID_LEVELS = [2, 4, 6, 8, 10]
const SCALE_MARKS = [0, 2, 4, 6, 8, 10]

// Health at top (-90°), then clockwise every 72°.
const angles = AXES.map(
  (_, i) => ((-90 + i * (360 / AXES.length)) * Math.PI) / 180,
)

function pt(value: number, i: number): [number, number] {
  const r = (value / 10) * R
  return [CX + r * Math.cos(angles[i]), CY + r * Math.sin(angles[i])]
}

function poly(values: number[]): string {
  return values.map((v, i) => pt(v, i).join(',')).join(' ')
}

// ---- datasets the radar morphs between (Health, Money, Relationships, Freedom, Faith) ----
const MAIN: number[][] = [
  [9, 9, 7, 6, 4],
  [7, 6, 9, 8, 6.5],
  [8.5, 5.5, 6, 9, 7.5],
  [6, 8.5, 8.5, 5.5, 9],
]
const SECONDARY: number[][] = [
  [4.5, 3.5, 5, 6.5, 5.5],
  [5.5, 5.5, 4, 4.5, 6.5],
  [4, 6.5, 6.5, 5, 4],
  [6, 4.5, 5.5, 6.5, 5],
]
// Third, subtle series — animated in the same RAF loop as the other series.
// Frames have clear per-axis deltas so its morph is visible without overpowering the chart.
const TERTIARY: number[][] = [
  [6.5, 4, 7, 5, 6.5],
  [4, 6.5, 5, 7, 4.5],
  [7, 5.5, 6.5, 4, 6.5],
  [5, 7, 4.5, 6, 4.5],
]

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerpArr = (a: number[], b: number[], t: number) =>
  a.map((v, i) => lerp(v, b[i], t))

// per-axis label placement: anchor + radial padding + nudge
const LABEL_META: {
  anchor: 'start' | 'middle' | 'end'
  pad: number
  dx: number
  dy: number
}[] = [
  { anchor: 'middle', pad: 48, dx: 0, dy: 0 }, // Health
  { anchor: 'start', pad: 26, dx: 8, dy: 0 }, // Money
  { anchor: 'start', pad: 26, dx: 8, dy: 4 }, // Relationships
  { anchor: 'end', pad: 26, dx: -8, dy: 4 }, // Freedom
  { anchor: 'end', pad: 26, dx: -8, dy: 0 }, // Faith
]

export default function AnimatedRadarChart({
  showLabels = true,
  showScale = true,
  className = '',
}: {
  showLabels?: boolean
  showScale?: boolean
  className?: string
}) {
  // Animated nodes are mutated imperatively in the RAF loop so the morph runs
  // on the compositor without re-rendering React 60×/second.
  const mainRef = useRef<SVGPolygonElement>(null)
  const secRef = useRef<SVGPolygonElement>(null)
  const terRef = useRef<SVGPolygonElement>(null)
  const dotsRef = useRef<Array<SVGCircleElement | null>>([])
  const rafRef = useRef<number>(0)
  const viewBox =
    showLabels || showScale ? `0 0 ${VB_W} ${VB_H}` : '108 54 484 492'

  useEffect(() => {
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced) return

    let idx = 0
    let t = 0
    let hold = 0
    let last = performance.now()
    const DURATION = 2.4 // seconds to morph between datasets
    const HOLD = 1.1 // seconds to rest on each dataset

    const apply = (mainV: number[], secV: number[], terV: number[]) => {
      mainRef.current?.setAttribute('points', poly(mainV))
      secRef.current?.setAttribute('points', poly(secV))
      terRef.current?.setAttribute('points', poly(terV))
      mainV.forEach((v, i) => {
        const dot = dotsRef.current[i]
        if (!dot) return
        const [x, y] = pt(v, i)
        dot.setAttribute('cx', String(x))
        dot.setAttribute('cy', String(y))
      })
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (hold > 0) {
        hold -= dt
      } else {
        t += dt / DURATION
        if (t >= 1) {
          t = 0
          idx = (idx + 1) % MAIN.length
          hold = HOLD
        }
      }

      const e = easeInOut(Math.min(t, 1))
      const next = (idx + 1) % MAIN.length
      apply(
        lerpArr(MAIN[idx], MAIN[next], e),
        lerpArr(SECONDARY[idx], SECONDARY[next], e),
        lerpArr(TERTIARY[idx], TERTIARY[next], e),
      )
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className={['mx-auto w-full max-w-[760px]', className].join(' ')}>
      <svg
        viewBox={viewBox}
        className="h-auto w-full"
        role="img"
        aria-label="Animated personal stats radar chart."
      >
        {/* grid rings */}
        {GRID_LEVELS.map((lvl) => (
          <polygon
            key={lvl}
            points={poly([lvl, lvl, lvl, lvl, lvl])}
            fill="none"
            stroke="rgba(156,203,216,0.42)"
            strokeWidth={1.2}
            strokeDasharray="4 5"
          />
        ))}

        {/* spokes */}
        {AXES.map((axis, i) => {
          const [x, y] = pt(10, i)
          return (
            <line
              key={axis}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="rgba(156,203,216,0.34)"
              strokeWidth={1.1}
              strokeDasharray="4 5"
            />
          )
        })}

        {/* tertiary polygon — sits furthest back */}
        <polygon
          ref={terRef}
          points={poly(TERTIARY[0])}
          fill="rgba(219,244,248,0.20)"
          stroke="rgba(36,152,199,0.42)"
          strokeWidth={1.65}
          strokeLinejoin="round"
        />

        {/* secondary (darker) polygon */}
        <polygon
          ref={secRef}
          points={poly(SECONDARY[0])}
          fill="rgba(36,152,199,0.11)"
          stroke="rgba(36,142,177,0.34)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* main polygon */}
        <polygon
          ref={mainRef}
          points={poly(MAIN[0])}
          fill="rgba(36,152,199,0.18)"
          stroke="#2498C7"
          strokeWidth={2.4}
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(36,152,199,0.22))' }}
        />

        {/* main vertices */}
        {MAIN[0].map((v, i) => {
          const [x, y] = pt(v, i)
          return (
            <circle
              key={i}
              ref={(el) => {
                dotsRef.current[i] = el
              }}
              cx={x}
              cy={y}
              r={3.6}
              fill="#147BA6"
            />
          )
        })}

        {showScale
          ? SCALE_MARKS.map((n) => {
              const [, y] = pt(n, 0)
              return (
                <text
                  key={n}
                  x={CX - 12}
                  y={y + 6}
                  textAnchor="end"
                  fill="#101820"
                  style={{ fontSize: 19, fontWeight: 700 }}
                >
                  {n}
                </text>
              )
            })
          : null}

        {showLabels
          ? AXES.map((axis, i) => {
              const meta = LABEL_META[i]
              const r = R + meta.pad
              const x = CX + r * Math.cos(angles[i]) + meta.dx
              const y = CY + r * Math.sin(angles[i]) + meta.dy
              return (
                <text
                  key={axis}
                  x={x}
                  y={y}
                  textAnchor={meta.anchor}
                  dominantBaseline="middle"
                  fill="#101820"
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {axis}
                </text>
              )
            })
          : null}
      </svg>
    </div>
  )
}
