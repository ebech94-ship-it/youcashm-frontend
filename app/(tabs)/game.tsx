import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";

import socket from "../services/socket";

import TopBar from "../components/TopBar";
import BettingPanel from "../components/BettingPanel";

const BASE_URL = "https://youcashm-backend.onrender.com";

type TrailPoint = {
  x: number;
  y: number;
  opacity: number;
};

export default function GameScreen() {
  // ======================
  // GAME STATE
  // ======================
  const [multiplier, setMultiplier] = useState(1);
  const [status, setStatus] = useState("WAITING");
  const [crashPoint, setCrashPoint] = useState<number | null>(null);

  const [betAmount, setBetAmount] = useState("100");
  const [roundId, setRoundId] = useState<string | null>(null);
  const [betId, setBetId] = useState<string | null>(null);
  const [roundHistory, setRoundHistory] = useState<number[]>([]);

  const [nextRoundCountdown, setNextRoundCountdown] = useState(5);
  const [isBettingPhase, setIsBettingPhase] = useState(true);

  const [, forceRender] = useState(0);

  // ======================
  // 🚀 CONTROL FLAG (IMPORTANT FIX)
  // ======================
  const isRunningRef = useRef(false);

  // ======================
  // PLANE ENGINE
  // ======================
  const planeX = useRef(new Animated.Value(0)).current;
  const planeY = useRef(new Animated.Value(0)).current;
  const planeRotate = useRef(new Animated.Value(0)).current;

  const trail = useRef<TrailPoint[]>([]);
  const frameRef = useRef<number | null>(null);

  // ======================
  // MULTIPLIER ENGINE
  // ======================
  const targetMultiplier = useRef(1);
  const displayedMultiplier = useRef(1);
  const planePos = useRef({ x: 0, y: 0 });

  const frameCountRef = useRef(0);

  // ======================
  // KEEP STATUS IN SYNC
  // ======================
  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // ======================
  // SOCKET EVENTS
  // ======================
  // ======================
// SOCKET EVENTS
// ======================
useEffect(() => {
  socket.off("roundStart");
  socket.off("multiplier");
  socket.off("roundCrash");
  socket.off("roundWaiting");

  // 🚀 ROUND START
  socket.on("roundStart", (data: any) => {
    setStatus("RUNNING");
    setIsBettingPhase(false);

    setRoundId(data.roundId);

    // reset crash
    setCrashPoint(null);

    // START ENGINE
    isRunningRef.current = true;

    // RESET MULTIPLIER ENGINE
    displayedMultiplier.current = 1;
    targetMultiplier.current = 1;

    setMultiplier(1);

    // RESET PLANE
    planeX.setValue(0);
    planeY.setValue(0);

    // RESET TRAIL
    trail.current = [];
  });

  // 📈 LIVE MULTIPLIER
  socket.on("multiplier", (data: any) => {
    targetMultiplier.current = Number(data.multiplier);
  });

  // 💥 ROUND CRASH
  socket.on("roundCrash", (data: any) => {
    setStatus("CRASHED");
    setIsBettingPhase(true);

    isRunningRef.current = false;

    // clear active bet
    setBetId(null);

    let countdown = 5;
    setNextRoundCountdown(countdown);

    const timer = setInterval(() => {
      countdown -= 1;
      setNextRoundCountdown(countdown);

      if (countdown <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    if (data?.crashPoint) {
      const point = Number(data.crashPoint);

      setCrashPoint(point);

      // ✅ LIVE HISTORY UPDATE
      setRoundHistory((prev) => {
        const updated = [point, ...prev];
        return updated.slice(0, 20);
      });
    }
  });

  // ⏳ WAITING
  socket.on("roundWaiting", (data: any) => {
    setStatus("WAITING");
    setIsBettingPhase(true);

    isRunningRef.current = false;

    setNextRoundCountdown(data?.countdown || 5);

    planeX.setValue(0);
    planeY.setValue(0);

    trail.current = [];
  });

  return () => {
    socket.off("roundStart");
    socket.off("multiplier");
    socket.off("roundCrash");
    socket.off("roundWaiting");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // ======================
  // 🚀 ANIMATION ENGINE (CONTROLLED)
  // ======================
  useEffect(() => {
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // ❌ BLOCK IF NOT RUNNING
      if (!isRunningRef.current) return;

      // ======================
      // 🎮 ANIMATION SPEED CONTROL (TWEAK THIS)
      // ======================
      const SMOOTHNESS = 0.18; // higher = faster response (0.1–0.3 recommended)

      // 🔥 REMOVE LAG BETWEEN BACKEND AND FRONTEND
      displayedMultiplier.current =
        displayedMultiplier.current +
        (targetMultiplier.current - displayedMultiplier.current) *
          SMOOTHNESS;

      const m = displayedMultiplier.current;

      // ======================
      // 🎯 MULTIPLIER UPDATE RATE CONTROL
      // ======================
      frameCountRef.current++;

      // lower number = more UI updates
      if (frameCountRef.current % 2 === 0) {
        setMultiplier(m);
      }

      // ======================
      // ✈️ PLANE MOVEMENT MODEL (TWEAKABLE)
      // ======================

      // X movement speed
      const X_SPEED = 120;

      // Y curve intensity (higher = steeper climb)
      const Y_INTENSITY = 65;
      
// ======================
// FLIGHT PATH
// ======================

// raw movement
let x = (m - 1) * X_SPEED;
let y = -Math.pow(m - 1, 1.45) * Y_INTENSITY;

planePos.current = { x, y };

// 🚧 HORIZONTAL LIMIT
const MAX_X = 260;

// 🚧 VERTICAL LIMIT
const MAX_Y = -250;

// keep plane inside box
if (x > MAX_X) x = MAX_X;
if (y < MAX_Y) y = MAX_Y;

// ✈️ SMOOTH SOARING EFFECT

// slower movement
const swing = Math.sin(Date.now() / 900) * 18;

// start soaring earlier
if (m > 2.5) {
  y += swing;
}

      planeX.setValue(x);
      planeY.setValue(y);

// ======================
// ✈️ ROTATION LOGIC
// ======================

// slope based rotation (movement direction feel)
const angle = Math.atan2(-y, x) * (180 / Math.PI);

// smooth it (VERY important)
planeRotate.setValue(angle);
      // ======================
      // TRAIL EFFECT
      // ======================
      trail.current.push({ x, y, opacity: 1 });

      trail.current = trail.current
        .map((p) => ({ ...p, opacity: p.opacity - 0.03 }))
        .filter((p) => p.opacity > 0);

      forceRender((v) => (v + 1) % 1000);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======================
  // BET
  // ======================
  const placeBet = async () => {
    if (!roundId) return;

    try {
      const res = await fetch(`${BASE_URL}/api/bet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "player1",
          amount: Number(betAmount),
          roundId,
        }),
      });

      const data = await res.json();
      setBetId(data.id || data.bet?.id);
    } catch (err) {
      console.log("BET ERROR:", err);
    }
  };

  // ======================
  // CASHOUT
  // ======================
  const cashout = async () => {
    if (!betId) return;

    try {
      const res = await fetch(`${BASE_URL}/api/cashout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ betId }),
      });

      const data = await res.json();

      if (data?.success) {
        setBetId(null);
      }
    } catch (err) {
      console.log("CASHOUT ERROR:", err);
    }
  };
 
  // ======================
  // UI
  // ======================
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
      
      <TopBar history={roundHistory} />

        <View style={styles.gameArea}>
          <View style={styles.grid} />
        
          {/* WAITING SCREEN */}
          
{status !== "RUNNING" && (
  <View style={styles.waitingScreen}>
    <Text style={styles.waitingLogo}>
      youCashM ✈️
    </Text>

    <Text style={styles.waitingSub}>
      GodSpeed Official Game
    </Text>

    <Text style={styles.waitingYear}>
      Since 2026
    </Text>
  </View>
)}
{/* TRAIL */}
{trail.current.map((p, i) => (
  <View
    key={i}
    style={[
      styles.trail,
      {
        left: p.x,
        top: p.y,
        opacity: p.opacity,
      },
    ]}
  />
))}

{/* PLANE */}
<Animated.View
  style={[
    styles.plane,
    {
      transform: [
        { translateX: planeX },
        { translateY: planeY },
        {
          rotate: planeRotate.interpolate({
            inputRange: [-90, 0, 90],
            outputRange: ["-45deg", "0deg", "45deg"],
          }),
        },
      ],
    },
  ]}
>
  <Text style={styles.planeText}>✈️</Text>
</Animated.View>

{/* MULTIPLIER */}
<Text style={styles.multiplier}>{multiplier.toFixed(2)}x</Text>

{/* STATUS */}
<Text style={styles.status}>{status}</Text>

{/* CRASH */}
{status === "CRASHED" && crashPoint && (
  <Text style={styles.crash}>
    💥 CRASHED AT {crashPoint.toFixed(2)}x
  </Text>
)}
          {/* COUNTDOWN */}
          {isBettingPhase && (
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>
                NEXT ROUND IN {nextRoundCountdown}s
              </Text>
            </View>
          )}
        </View>

        <BettingPanel
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          placeBet={placeBet}
          cashout={cashout}
        />
      </View>
    </ScrollView>
  );
}

// ======================
// STYLES
// ======================
const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },

  container: {
    flex: 1,
    backgroundColor: "#0b0b0f",
    paddingHorizontal: 15,
    paddingTop: 40,
  },

  gameArea: {
    height: 420,
    backgroundColor: "#0f1118",
    borderRadius: 22,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  grid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    borderWidth: 1,
    borderColor: "#fff",
  },

  trail: {
  position: "absolute",
  width: 16,
  height: 4,
  borderRadius: 4,
  backgroundColor: "#ff3b3b", // brighter red
  zIndex: 10,
},

  plane: {
    position: "absolute",
    left: 40,
    bottom: 90,
  },

  planeText: {
    fontSize: 48,
  },

  multiplier: {
    fontSize: 70,
    fontWeight: "900",
    color: "#fff",
  },

  status: {
    marginTop: 6,
    color: "#00ff88",
    fontWeight: "bold",
  },

  crash: {
    marginTop: 10,
    color: "#ff3b3b",
    fontSize: 18,
    fontWeight: "bold",
  },

  countdown: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#161821",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },

  countdownText: {
    color: "#00ff88",
    fontWeight: "bold",
  },
  waitingScreen: {
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
},

waitingLogo: {
  color: "#ff1744",
  fontSize: 34,
  fontWeight: "900",
},

waitingSub: {
  color: "#00ff88",
  fontSize: 16,
  marginTop: 10,
  fontWeight: "bold",
},

waitingYear: {
  color: "#888",
  marginTop: 6,
},
rope: {
  position: "absolute",
  height: 2,
  backgroundColor: "#00ff88",
  opacity: 0.6,
},
});