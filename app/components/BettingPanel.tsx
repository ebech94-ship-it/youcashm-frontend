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
}

export default function BettingPanel({
  betAmount,
  setBetAmount,
  placeBet,
  cashout,
}: Props) {

  const quickAmounts = [100, 200, 500, 1000];
  return (
    <View style={styles.container}>

      {/* TOP */}
      <View style={styles.toggleRow}>
        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>Bet</Text>
        </View>

        <View style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>Auto</Text>
        </View>
      </View>

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
});