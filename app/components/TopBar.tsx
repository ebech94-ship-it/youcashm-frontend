import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
   ScrollView,
} from "react-native";

type Props = {
  history: number[];
  onlineUsers: number;
};

export default function TopBar({ history, onlineUsers }: Props) {
  const [showBalance, setShowBalance] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 💱 simple FX (approx)
  const XAF_TO_USD = 0.00165;

  const balanceXAF = 12500;
  const balanceUSD = balanceXAF * XAF_TO_USD;

  

  // =========================
  // 🎬 PANEL ANIMATION
  // =========================
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showHistory ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [showHistory, fadeAnim]);

  const toggleHistory = () => setShowHistory((p) => !p);
  const closeHistory = () => setShowHistory(false);

  // =========================
  // 🎨 MULTIPLIER COLORS
  // =========================
  const getMultiplierColor = (value: number) => {
    if (value < 2) return "#ffffff";
    if (value < 10) return "#7c3aed"; // purple-blue
    if (value < 20) return "#22c55e"; // green
    if (value < 50) return "#facc15"; // yellow
    return "#ef4444"; // red (huge crash)
  };

  return (
  <View style={styles.container}>

    {/* LEFT */}
    <View>
      <Text style={styles.logo}>youCashM</Text>
     <Text style={styles.online}>
  {onlineUsers.toLocaleString()} Online
</Text>
    </View>

    {/* CENTER (HISTORY + MINI ROUNDS) */}
    <View style={styles.centerBox}>

      <TouchableOpacity
        onPress={toggleHistory}
        style={styles.historyBtn}
      >
        <Text style={styles.historyIcon}>📜</Text>
      </TouchableOpacity>

      <View style={styles.miniHistory}>
        {history.slice(0, 3).map((item, i) => (
          <Text key={i} style={styles.miniChip}>
            {Number(item).toFixed(2)}x
          </Text>
        ))}
      </View>

    </View>

    {/* RIGHT */}
    <View style={styles.rightBox}>

      {/* BALANCE */}
      <View style={styles.balanceBox}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>BALANCE</Text>

          <TouchableOpacity onPress={() => setShowBalance((p) => !p)}>
            <Text style={styles.eye}>
              {showBalance ? "👁️" : "🙈"}
            </Text>
          </TouchableOpacity>
        </View>

        {showBalance ? (
          <>
            <Text style={styles.balance}>
              {balanceXAF.toLocaleString()} XAF
            </Text>

            <Text style={styles.usd}>
              ≈ ${balanceUSD.toFixed(2)} USD
            </Text>
          </>
        ) : (
          <Text style={styles.balance}>••••••</Text>
        )}
      </View>

      {/* + DEPOSIT */}
      <TouchableOpacity
        onPress={() => console.log("OPEN DEPOSIT MODAL")}
        style={styles.addBtn}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>

    </View>

    {/* OVERLAY */}
    {showHistory && (
      <Pressable
        style={styles.overlay}
        onPress={closeHistory}
      />
    )}

    {/* HISTORY PANEL */}
    {showHistory && (
      <Animated.View
        style={[styles.panel, { opacity: fadeAnim }]}
      >
        <Text style={styles.panelTitle}>
          Round History
        </Text>

        {history.length === 0 ? (
          <Text style={styles.empty}>
            No rounds yet
          </Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.historyScroll}
          >
            {history.map((item, i) => (
              <View
                key={i}
                style={[
                  styles.historyChip,
                  {
                    borderColor: getMultiplierColor(item),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.multiplier,
                    {
                      color: getMultiplierColor(item),
                    },
                  ]}
                >
                  {Number(item).toFixed(2)}x
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </Animated.View>
    )}

  </View>
);
}

const styles = StyleSheet.create({
  container: {    width: "100%",    flexDirection: "row",    justifyContent: "space-between",    alignItems: "flex-start",
    paddingHorizontal: 20,    paddingTop: 20,    marginBottom: 15,    zIndex: 1000,  },
  logo: {    color: "#00ff88",    fontSize: 28,    fontWeight: "bold",  },
  online: {    color: "#888",    marginTop: 3,  },
  rightBox: {    flexDirection: "row",    alignItems: "center",    gap: 10,  },
  balanceBox: {    backgroundColor: "#161821",    paddingVertical: 10,    paddingHorizontal: 15,    borderRadius: 12,
    alignItems: "center",  },
  balanceHeader: {    flexDirection: "row",    alignItems: "center",    gap: 8,  },
  balanceLabel: {    color: "#888",    fontSize: 11,  },
  eye: {    fontSize: 14,  },
  balance: {    color: "white",    fontWeight: "bold",    marginTop: 2,  },
  usd: {    color: "#888",   fontSize: 11,    marginTop: 2,  },
  historyBtn: {    backgroundColor: "#111827",    padding: 10,    borderRadius: 10,  },
  historyIcon: {    fontSize: 18,  },
  overlay: {    position: "absolute",    top: 80,    left: 0,    right: 0,    bottom: 0,  },
 historyScroll: {  flexDirection: "row",  alignItems: "center",},
historyChip: {  backgroundColor: "#161821",  paddingHorizontal: 10,  paddingVertical: 6,  borderRadius: 10,
  borderWidth: 1,  marginRight: 8,}, 
  panel: {    position: "absolute",    top: 80,    right: 20,    width: "90%",    maxHeight: 220,
    backgroundColor: "#0f172a",    borderRadius: 12,    padding: 10,    elevation: 10,  },
  panelTitle: {    color: "#fff",    fontSize: 12,    marginBottom: 8,    opacity: 0.8,  },
  empty: {    color: "#888",    fontSize: 12,  },
  row: {    paddingVertical: 4,  },
  multiplier: {    fontSize: 14,    fontWeight: "600",  },
  centerBox: {  alignItems: "center",  justifyContent: "center",},
miniHistory: {  flexDirection: "row",  marginTop: 5,  gap: 4,},
miniChip: {  fontSize: 11,  color: "#00ff88",  backgroundColor: "#161821",  paddingHorizontal: 6,
  paddingVertical: 2,  borderRadius: 6,},
addBtn: {  backgroundColor: "#00ff88",  paddingHorizontal: 10,  paddingVertical: 8,
  borderRadius: 10,  marginLeft: 8,},
addText: {  fontSize: 18,  fontWeight: "900",  color: "#000",},
});