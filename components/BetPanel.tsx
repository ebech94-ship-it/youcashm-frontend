"use client";

import React from "react";

interface Props {
  betAmount: string;
  setBetAmount: (value: string) => void;
  placeBet: () => void;
  cashout: () => void;

  autoTab: boolean;
  setAutoTab: (v: boolean) => void;

  autoBetEnabled: boolean;
  setAutoBetEnabled: (v: boolean) => void;

  autoCashoutEnabled: boolean;
  setAutoCashoutEnabled: (v: boolean) => void;

  autoCashout: number | null;
  setAutoCashout: (v: number | null) => void;

  playersBetting: number;
}

export default function BetPanel({
  betAmount,
  setBetAmount,
  placeBet,
  cashout,
  autoTab,
  setAutoTab,
  autoBetEnabled,
  setAutoBetEnabled,
  autoCashoutEnabled,
  setAutoCashoutEnabled,
  autoCashout,
  setAutoCashout,
  playersBetting,
}: Props) {

  const quickAmounts = [100, 200, 500, 1000];
  const [loadingBet, setLoadingBet] = React.useState(false);
const [loadingCashout, setLoadingCashout] = React.useState(false);

  return (
    <div style={styles.container as React.CSSProperties}>

      {/* TAB SWITCH */}
      <div style={styles.toggleRow as React.CSSProperties}>
        <button
          onClick={() => setAutoTab(false)}
          style={{
            ...styles.tab,
            backgroundColor: !autoTab ? "#2a2d38" : "transparent",
            color: !autoTab ? "#fff" : "#777",
          }}
        >
          Bet
        </button>

        <button
          onClick={() => setAutoTab(true)}
          style={{
            ...styles.tab,
            backgroundColor: autoTab ? "#2a2d38" : "transparent",
            color: autoTab ? "#fff" : "#777",
          }}
        >
          Auto
        </button>
      </div>

      {/* AUTO CONTROLS */}
      {autoTab && (
        <div style={styles.autoRow as React.CSSProperties}>

          {/* AUTO BET */}
          <div style={styles.autoBox as React.CSSProperties}>
            <p>Auto Bet</p>
            <button
              onClick={() => setAutoBetEnabled(!autoBetEnabled)}
              style={{
                padding: "6px 12px",
                background: autoBetEnabled ? "#22c55e" : "#333",
                color: "#fff",
                border: "none",
                borderRadius: 8,
              }}
            >
              {autoBetEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* AUTO CASHOUT */}
          <div style={styles.autoBox as React.CSSProperties}>
            <p>Auto Cashout</p>
            <button
              onClick={() => setAutoCashoutEnabled(!autoCashoutEnabled)}
              style={{
                padding: "6px 12px",
                background: autoCashoutEnabled ? "#22c55e" : "#333",
                color: "#fff",
                border: "none",
                borderRadius: 8,
              }}
            >
              {autoCashoutEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* INPUT */}
          <input
            value={autoCashout ?? ""}
            onChange={(e) =>
              setAutoCashout(
                e.target.value ? parseFloat(e.target.value) : null
              )
            }
            placeholder="1.50x"
            style={styles.autoInput as React.CSSProperties}
          />
        </div>
      )}

      {/* BET INPUT */}
      <div style={styles.inputRow as React.CSSProperties}>
        <button
         onClick={() => {
  const safe = Number(betAmount) || 0;
  setBetAmount(Math.max(0, safe - 100).toString());
}}
        >
          -
        </button>

        <input
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          style={styles.input}
        />

        <button
         onClick={() => {
  const safe = Number(betAmount) || 0;
  setBetAmount((safe + 100).toString());
}}
        >
          +
        </button>
      </div>

      {/* QUICK AMOUNTS */}
      <div style={styles.quickRow as React.CSSProperties}>
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => setBetAmount(String(amt))}
            style={styles.quickButton}
          >
            {amt}
          </button>
        ))}
      </div>

      {/* ACTIONS */}
      <div style={styles.actionRow as React.CSSProperties}>
        <button
  onClick={async () => {
    if (loadingBet) return;
    setLoadingBet(true);
    await placeBet();
    setLoadingBet(false);
  }}
  disabled={loadingBet}
  style={styles.betBtn}
>
  {loadingBet ? "BETTING..." : "BET"}
</button>

       <button
  onClick={async () => {
    if (loadingCashout) return;
    setLoadingCashout(true);
    await cashout();
    setLoadingCashout(false);
  }}
  disabled={loadingCashout}
  style={styles.cashBtn}
>
  {loadingCashout ? "..." : "CASHOUT"}
</button>
      </div>

      <p style={{ color: "#888", marginTop: 10 }}>
        {playersBetting} players betting
      </p>
    </div>
  );
}

/* SIMPLE INLINE STYLES (NO TAILWIND YET = FAST MIGRATION) */
const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    background: "#12131a",
    borderRadius: 16,
    padding: 16,
    color: "white",
  },

  toggleRow: {
    display: "flex",
    marginBottom: 12,
  },

  tab: {
    flex: 1,
    padding: 10,
    border: "none",
    cursor: "pointer",
  },

  autoRow: {
    display: "flex",
    gap: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  autoBox: {
    flex: 1,
    textAlign: "center",
    background: "#1a1c24",
    padding: 10,
    borderRadius: 10,
  },

  autoInput: {
    flex: 1,
    padding: 10,
    background: "#1a1c24",
    border: "none",
    borderRadius: 10,
    color: "white",
    textAlign: "center",
  },

  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },

  quickRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  quickButton: {
    padding: 8,
    background: "#1a1c24",
    color: "#aaa",
    border: "none",
    borderRadius: 8,
  },

  actionRow: {
    display: "flex",
    gap: 10,
  },

  betBtn: {
    flex: 1,
    padding: 12,
    background: "#22c55e",
    border: "none",
    color: "#000",
    fontWeight: "bold",
    borderRadius: 10,
  },

  cashBtn: {
    flex: 1,
    padding: 12,
    background: "#00ff88",
    border: "none",
    color: "#000",
    fontWeight: "bold",
    borderRadius: 10,
  },
};