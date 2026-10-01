/** 18-seat ring — filled = taken. Pure presentational. */
export function SeatRing({
  taken,
  total = 18,
  size = 120,
  label,
}: {
  taken: number;
  total?: number;
  size?: number;
  label?: string;
}) {
  const r = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const dots = Array.from({ length: total }, (_, i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      filled: i < taken,
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label ?? `${taken} of ${total} seats filled`}
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={5}
          fill={d.filled ? "var(--lime)" : "var(--control)"}
          stroke={d.filled ? "var(--lime)" : "var(--border)"}
          strokeWidth={1}
        />
      ))}
      <circle cx={cx} cy={cy} r={22} fill="var(--lime)" />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="var(--lime-text)"
        fontFamily="var(--font-display), system-ui, sans-serif"
      >
        P
      </text>
    </svg>
  );
}
