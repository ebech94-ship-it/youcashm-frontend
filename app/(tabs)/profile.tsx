import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
} from "react-native";

const avatars = [
  "😎",
  "🔥",
  "🚀",
  "🎮",
  "🦅",
  "💎",
  "👑",
  "⚡",
];

export default function ProfileScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("😎");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ================= PROFILE HEADER ================= */}

        <View style={styles.profileCard}>

          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {selectedAvatar}
            </Text>
          </View>

          <Text style={styles.username}>Player Profile</Text>

          <Text style={styles.subText}>
            Customize your gaming experience
          </Text>

          {/* SHARE / INVITE */}
          <Pressable style={styles.inviteButton}>
            <Text style={styles.inviteText}>
              👥 Invite / Share
            </Text>
          </Pressable>

        </View>

        {/* ================= AVATARS ================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Choose Avatar
          </Text>

          <View style={styles.avatarGrid}>
            {avatars.map((avatar) => (
              <Pressable
                key={avatar}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar &&
                    styles.avatarActive,
                ]}
                onPress={() => setSelectedAvatar(avatar)}
              >
                <Text style={styles.avatarEmoji}>
                  {avatar}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.uploadButton}>
            <Text style={styles.uploadText}>
              📸 Upload From Device
            </Text>
          </Pressable>
        </View>

        {/* ================= SOUND ================= */}

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionTitle}>
                Sound Effects
              </Text>

              <Text style={styles.info}>
                Enable game sounds & effects
              </Text>
            </View>

            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
            />
          </View>
        </View>

        {/* ================= BET HISTORY ================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            My Bet History
          </Text>

          <View style={styles.historyItem}>
            <View>
              <Text style={styles.betId}>
                Bet #A1024
              </Text>
              <Text style={styles.betDate}>
                18 May 2026 • 20:35
              </Text>
            </View>

            <Text style={styles.winText}>
              +1,500 FCFA
            </Text>
          </View>

          <View style={styles.historyItem}>
            <View>
              <Text style={styles.betId}>
                Bet #A1025
              </Text>
              <Text style={styles.betDate}>
                18 May 2026 • 20:41
              </Text>
            </View>

            <Text style={styles.lossText}>
              -500 FCFA
            </Text>
          </View>
        </View>

        {/* ================= GAME LIMITS ================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Game Limits
          </Text>

          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>
              Minimum Bet
            </Text>

            <Text style={styles.limitValue}>
              100 FCFA
            </Text>
          </View>

          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>
              Maximum Bet
            </Text>

            <Text style={styles.limitValue}>
              100,000 FCFA
            </Text>
          </View>

          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>
              Maximum Payout
            </Text>

            <Text style={styles.limitValue}>
              5,000,000 FCFA
            </Text>
          </View>
        </View>

        {/* ================= HOW TO PLAY ================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            How To Play
          </Text>

          <Text style={styles.info}>
            • Enter your bet amount{"\n"}
            • Press BET before round starts{"\n"}
            • Watch multiplier rise{"\n"}
            • Cash out before crash{"\n"}
            • Higher multiplier = bigger winnings
          </Text>
        </View>

        {/* ================= GAME RULES ================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Game Rules
          </Text>

          <Text style={styles.info}>
            • Bets cannot be cancelled after round starts{"\n"}
            • Crashes are random and provably fair{"\n"}
            • Winnings depend on cashout multiplier{"\n"}
            • Network interruptions may affect gameplay
          </Text>
        </View>

        {/* ================= PROVABLY FAIR ================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Provably Fair
          </Text>

          <Text style={styles.info}>
            This game uses a provably fair algorithm
            to ensure crash outcomes are random,
            transparent, and verifiable by players.
          </Text>

          <Pressable style={styles.fairButton}>
            <Text style={styles.fairButtonText}>
              VERIFY FAIRNESS
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
  },

  profileCard: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  avatarText: {
    fontSize: 48,
  },

  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },

  subText: {
    color: "#666",
    marginTop: 5,
  },

  inviteButton: {
    marginTop: 15,
    backgroundColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  inviteText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 10,
  },

  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarActive: {
    borderWidth: 2,
    borderColor: "#3b82f6",
  },

  avatarEmoji: {
    fontSize: 28,
  },

  uploadButton: {
    marginTop: 15,
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  uploadText: {
    color: "white",
    fontWeight: "bold",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  info: {
    color: "#555",
    lineHeight: 22,
  },

  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  betId: {
    fontWeight: "bold",
    color: "#111",
  },

  betDate: {
    color: "#777",
    fontSize: 12,
    marginTop: 3,
  },

  winText: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  lossText: {
    color: "#dc2626",
    fontWeight: "bold",
  },

  limitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  limitLabel: {
    color: "#555",
  },

  limitValue: {
    fontWeight: "bold",
    color: "#111",
  },

  fairButton: {
    marginTop: 15,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  fairButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});