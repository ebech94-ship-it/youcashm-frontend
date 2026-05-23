import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";

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

export default function BettingPanel({
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
}: Props){

  const quickAmounts = [100, 200, 500, 1000];
  return (
    <View style={styles.container}>

      {/* TOP */}
     <View style={styles.toggleRow}>

  <Pressable
    style={[styles.tab, !autoTab && styles.activeTab]}
    onPress={() => setAutoTab(false)}
  >
    <Text style={!autoTab ? styles.activeTabText : styles.inactiveTabText}>
      Bet
    </Text>
  </Pressable>

  <Pressable
    style={[styles.tab, autoTab && styles.activeTab]}
    onPress={() => setAutoTab(true)}
  >
    <Text style={autoTab ? styles.activeTabText : styles.inactiveTabText}>
      Auto
    </Text>
  </Pressable>

</View>
{autoTab && (
  <View style={styles.autoRow}>

    {/* AUTO BET TOGGLE */}
    <View style={styles.autoBox}>
      <Text style={styles.autoTitle}>Auto Bet</Text>

      <Pressable
  style={[
    styles.switchBase,
    autoBetEnabled && styles.switchOn
  ]}
  onPress={() => setAutoBetEnabled(!autoBetEnabled)}
>
  <View
    style={[
      styles.switchKnob,
      autoBetEnabled && styles.knobOn
    ]}
  />
</Pressable>
    </View>

    {/* AUTO CASHOUT TOGGLE */}
    <View style={styles.autoBox}>
      <Text style={styles.autoTitle}>Auto Cashout</Text>

     <Pressable
  style={[
    styles.switchBase,
    autoCashoutEnabled && styles.switchOn
  ]}
  onPress={() =>
    setAutoCashoutEnabled(!autoCashoutEnabled)
  }
>
  <View
    style={[
      styles.switchKnob,
      autoCashoutEnabled && styles.knobOn
    ]}
  />
</Pressable>
    </View>

    {/* AUTO CASHOUT INPUT (EXPANDED) */}
    <TextInput
      style={styles.autoInput}
      placeholder="1.50x"
      placeholderTextColor="#666"
      keyboardType="decimal-pad"
    value={autoCashout !== null ? String(autoCashout) : ""}
      onChangeText={(v) => {
        const num = parseFloat(v);
        setAutoCashout(isNaN(num) ? null : num);
      }}
    />

  </View>
)}

      {/* INPUT */}
      <View style={styles.inputRow}>

        <Pressable
          style={styles.adjustButton}
          onPress={() =>
            setBetAmount(
              Math.max(0, Number(betAmount) - 100).toString()
                )
          }
        >
          <Text style={styles.adjustText}>-</Text>
        </Pressable>

        <TextInput
          style={styles.input}
          value={betAmount}
          onChangeText={setBetAmount}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.adjustButton}
          onPress={() =>
            setBetAmount(
              (Number(betAmount) + 100).toString()
            )
          }
        >
          <Text style={styles.adjustText}>+</Text>
        </Pressable>
      </View>
      {/* QUICK AMOUNTS */}
      <View style={styles.quickRow}>
        {quickAmounts.map((amount) => (
          <Pressable
            key={amount}
            style={styles.quickButton}
            onPress={() => setBetAmount(amount.toString())}
          >
            <Text style={styles.quickText}>{amount}</Text>
          </Pressable>
        ))}
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actionRow}>
        <Pressable style={styles.betButton} onPress={placeBet}>
          <Text style={styles.actionText}>BET</Text>
        </Pressable>

        <Pressable style={styles.cashoutButton} onPress={cashout}>
          <Text style={styles.actionText}>CASHOUT</Text>
        </Pressable>
      </View>
      <Text style={{ color: "#888", marginBottom: 10 }}>
  {playersBetting} players betting
</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#12131a",
    borderRadius: 20,
    padding: 18,
  },

  toggleRow: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#1a1c24",
    borderRadius: 14,
    overflow: "hidden",
  },

  activeTab: {
    flex: 1,
    paddingVertical: 12,
     backgroundColor: "#2a2d38",
    alignItems: "center",
  },

  inactiveTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },

  inactiveTabText: {
    color: "#777",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
     },

  adjustButton: {
    width: 50,
    height: 50,
    backgroundColor: "#1f2230",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  adjustText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  input: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: "#1a1c24",
    color: "white",
    borderRadius: 12,
    textAlign: "center",
      fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 12,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickButton: {
    backgroundColor: "#1a1c24",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  quickText: {
    color: "#aaa",
    fontWeight: "bold",
  },

  actionRow: {
    flexDirection: "row",
    gap: 15,
  },

  betButton: {
    flex: 1,
    backgroundColor: "#22c55e",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  cashoutButton: {
    flex: 1,
    backgroundColor: "#00ff88",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  actionText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    },
    tab: {
  flex: 1,
  paddingVertical: 12,
  alignItems: "center",
},
autoRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 15,
},

autoBox: {
  flex: 1,
  alignItems: "center",
  backgroundColor: "#1a1c24",
  paddingVertical: 10,
  borderRadius: 12,
},

autoTitle: {
  color: "#aaa",
  fontSize: 12,
  marginBottom: 8,
},

/* SWITCH BASE */
switchBase: {
  width: 42,
  height: 22,
  borderRadius: 20,
  backgroundColor: "#333",
  justifyContent: "center",
  padding: 2,
},

switchOn: {
  backgroundColor: "#22c55e",
},

/* KNOB */
switchKnob: {
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: "#fff",
},

knobOn: {
  transform: [{ translateX: 20 }],
},

/* INPUT */
autoInput: {
  flex: 1.2,
  backgroundColor: "#1a1c24",
  color: "white",
  textAlign: "center",
  borderRadius: 12,
  fontSize: 18,
  fontWeight: "bold",
  paddingVertical: 10,
},
});