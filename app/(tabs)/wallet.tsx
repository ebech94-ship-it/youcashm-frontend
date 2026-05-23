import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

export default function WalletScreen() {
  const [tab, setTab] = useState<
    "main" | "deposit" | "withdraw" | "statement" | "help" | "logout"
  >("main");

  const [amount, setAmount] = useState("");
  const balance = 12500;

  const min = 500;
  const max = 200000;

  const num = Number(amount);
  const validAmount = !isNaN(num) && num >= min && num <= max;

  return (
    <View style={styles.container}>

      <View style={styles.layout}>

        {/* ================= LEFT TAB MENU ================= */}
        <View style={styles.sidebar}>
          {["main", "deposit", "withdraw", "statement", "help", "logout"].map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t as any)}
              style={[styles.sideTab, tab === t && styles.sideTabActive]}
            >
              <Text style={tab === t ? styles.sideTextActive : styles.sideText}>
                {t.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ================= MAIN CONTENT ================= */}
        <ScrollView contentContainerStyle={styles.content}>

          {/* ================= BALANCE HEADER ================= */}
          <View style={styles.header}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <Text style={styles.balance}>
              {balance.toLocaleString()} FCFA
            </Text>
            <Text style={styles.phone}>
              📱 MTN / Orange: +237 6XX XXX XXX
            </Text>
          </View>

          {/* ================= MAIN ================= */}
          {tab === "main" && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>

              <View style={styles.row}>
                <Pressable
                  style={styles.depositBtn}
                  onPress={() => setTab("deposit")}
                >
                  <Text style={styles.btnText}>DEPOSIT</Text>
                </Pressable>

                <Pressable
                  style={styles.withdrawBtn}
                  onPress={() => setTab("withdraw")}
                >
                  <Text style={styles.btnText}>WITHDRAW</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* ================= DEPOSIT ================= */}
          {tab === "deposit" && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Deposit</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />

              <Text style={styles.hint}>
                Min {min} FCFA | Max {max.toLocaleString()} FCFA
              </Text>

              <Pressable
                style={[styles.actionBtn, !validAmount && { opacity: 0.4 }]}
                disabled={!validAmount}
              >
                <Text style={styles.actionText}>CONFIRM DEPOSIT</Text>
              </Pressable>
            </View>
          )}

          {/* ================= WITHDRAW ================= */}
          {tab === "withdraw" && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Withdraw</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />

              <Text style={styles.hint}>
                Available: {balance.toLocaleString()} FCFA
              </Text>

              <Pressable
                style={[
                  styles.actionBtn,
                  (!validAmount || num > balance) && { opacity: 0.4 },
                ]}
                disabled={!validAmount || num > balance}
              >
                <Text style={styles.actionText}>WITHDRAW NOW</Text>
              </Pressable>
            </View>
          )}

          {/* ================= STATEMENT ================= */}
          {tab === "statement" && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Statements</Text>

              <View style={styles.statement}>
                <Text>Bet #12345</Text>
                <Text style={{ color: "green" }}>+1200 FCFA</Text>
              </View>

              <View style={styles.statement}>
                <Text>Bet #12346</Text>
                <Text style={{ color: "red" }}>-500 FCFA</Text>
              </View>
            </View>
          )}

          {/* ================= HELP ================= */}
          {tab === "help" && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Help Center</Text>
              <Text style={styles.info}>
                • Deposits instant via MTN/Orange{"\n"}
                • Withdrawals 1–5 minutes{"\n"}
                • Min withdrawal 1000 FCFA
              </Text>
            </View>
          )}

          {/* ================= LOGOUT ================= */}
          {tab === "logout" && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Logout</Text>

              <Pressable style={styles.logoutBtn}>
                <Text style={styles.logoutText}>LOG OUT</Text>
              </Pressable>
            </View>
          )}

        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  layout: {
    flex: 1,
    flexDirection: "row",
  },

  sidebar: {
    width: 110,
    backgroundColor: "#f4f6f8",
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: "#e5e5e5",
  },

  sideTab: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },

  sideTabActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },

  sideText: {
    fontSize: 10,
    color: "#555",
    fontWeight: "600",
  },

  sideTextActive: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },

  content: {
    flexGrow: 1,
    padding: 15,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  balanceLabel: {
    color: "#777",
  },

  balance: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111",
  },

  phone: {
    color: "#666",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  depositBtn: {
    flex: 1,
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  withdrawBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  hint: {
    color: "#777",
    fontSize: 12,
    marginTop: 5,
  },

  actionBtn: {
    backgroundColor: "#3b82f6",
    padding: 12,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "white",
    fontWeight: "bold",
  },

  statement: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  info: {
    color: "#555",
    lineHeight: 20,
  },

  logoutBtn: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});