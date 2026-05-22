"use client";

import { useMemo } from "react";

export type LiveBetRow = {
  id: string;
  bet: number;
  multiplier: number;
  cashout: number | null;
};

type Props = {
  data: LiveBetRow[];
};

export default function Leaderboard({ data }: Props) {
  const rows = useMemo(() => {
    return [...data].slice(0, 50);
  }, [data]);

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>Player</div>
        <div>Bet (FCFA)</div>
        <div>Multiplier</div>
        <div>Cashout</div>
      </div>

      {/* ROWS */}
      <div style={styles.body}>
        {rows.map((row, i) => (
          <div
            key={row.id}
            style={{
              ...styles.row,
              background: i % 2 === 0 ? "#0f1118" : "#0c0e14",
            }}
          >
            <div style={styles.player}>{row.id}</div>

            <div style={styles.bet}>
              {row.bet.toLocaleString()} FCFA
            </div>

            <div
              style={{
                ...styles.multiplier,
                color:
                  row.multiplier >= 2
                    ? "#22c55e"
                    : "#facc15",
              }}
            >
              {row.multiplier.toFixed(2)}x
            </div>

            <div
              style={{
                ...styles.cashout,
                color: row.cashout ? "#22c55e" : "#ff3b3b",
              }}
            >
              {row.cashout
                ? `${row.cashout.toLocaleString()} FCFA`
                : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    background: "linear-gradient(180deg, #0f1118, #0b0b0f)",
    borderRadius: 14,
    border: "1px solid #1f2937",
    overflow: "hidden",
    height: 240,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    padding: "10px 12px",
    fontSize: 12,
    color: "#9ca3af",
    borderBottom: "1px solid #1f2937",
    background: "#0b0d13",
    fontWeight: 600,
  },

  body: {
    overflowY: "auto",
    flex: 1,
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    padding: "8px 12px",
    fontSize: 13,
    alignItems: "center",
    transition: "all 0.2s ease",
  },

  player: {
    color: "#00ff88",
    fontWeight: 600,
  },

  bet: {
    color: "#e5e7eb",
  },

  multiplier: {
    fontWeight: 700,
  },

  cashout: {
    fontWeight: 700,
  },
};