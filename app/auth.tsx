import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AuthScreen() {
  const [tab, setTab] = useState<"signup" | "login">("signup");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ================= PHONE VALIDATION =================
  const validPhone =
    phone.startsWith("6") && phone.length === 9;

  // ================= PASSWORD VALIDATION =================
  const validPassword = password.length >= 4;

  const passwordsMatch =
    password === confirmPassword;

  const signupValid =
    validPhone &&
    validPassword &&
    passwordsMatch;

  const loginValid =
    validPhone &&
    validPassword;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >

        {/* ================= LOGO / TITLE ================= */}

        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>Y</Text>
          </View>

          <Text style={styles.title}>
            youCashM
          </Text>

          <Text style={styles.subtitle}>
            Fast crash gaming with MTN MoMo
          </Text>
        </View>

        {/* ================= TAB SWITCH ================= */}

        <View style={styles.tabRow}>

          <Pressable
            style={[
              styles.tabButton,
              tab === "signup" && styles.activeTab,
            ]}
            onPress={() => setTab("signup")}
          >
            <Text
              style={
                tab === "signup"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              JOIN NOW
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.tabButton,
              tab === "login" && styles.activeTab,
            ]}
            onPress={() => setTab("login")}
          >
            <Text
              style={
                tab === "login"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              LOGIN
            </Text>
          </Pressable>

        </View>

        {/* ================= SIGNUP ================= */}

        {tab === "signup" && (
          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              Create Account
            </Text>

            <Text style={styles.info}>
              Enter your MTN Mobile Money number
            </Text>

            {/* PHONE */}
            <TextInput
              style={styles.input}
              placeholder="MTN Number (6XXXXXXXX)"
              keyboardType="number-pad"
              maxLength={9}
              value={phone}
              onChangeText={setPhone}
            />

            {/* PASSWORD */}
            <TextInput
              style={styles.input}
              placeholder="Create Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* CONFIRM PASSWORD */}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* VALIDATION TEXTS */}

            {!validPhone && phone.length > 0 && (
              <Text style={styles.error}>
                Enter valid MTN Cameroon number
              </Text>
            )}

            {!passwordsMatch &&
              confirmPassword.length > 0 && (
                <Text style={styles.error}>
                  Passwords do not match
                </Text>
              )}

            {/* JOIN BUTTON */}
<Pressable
  style={[
    styles.mainButton,
    !signupValid && styles.disabledButton,
  ]}
  disabled={!signupValid}
  onPress={async () => {
    try {

      const response = await fetch(
  "https://youcashm-backend.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {

        await AsyncStorage.setItem(
          "token",
          data.token
        );

        router.replace("/game");

      } else {
        alert(data.error || "Signup failed");
      }

    } catch {
      alert("Network error");
    }
  }}
>
  <Text style={styles.mainButtonText}>
    JOIN NOW
  </Text>
</Pressable>

            <Text style={styles.footerText}>
              By joining, you agree to our
              Terms & Fair Play Policy
            </Text>

          </View>
        )}

        {/* ================= LOGIN ================= */}

        {tab === "login" && (
          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              Welcome Back
            </Text>

            {/* PHONE */}
            <TextInput
              style={styles.input}
              placeholder="MTN Number"
              keyboardType="number-pad"
              maxLength={9}
              value={phone}
              onChangeText={setPhone}
            />

            {/* PASSWORD */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* LOGIN BUTTON */}

            <Pressable
  style={[
    styles.mainButton,
    !loginValid && styles.disabledButton,
  ]}
  disabled={!loginValid}
  onPress={async () => {
    try {

      const response = await fetch(
  "https://youcashm-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {

        await AsyncStorage.setItem(
          "token",
          data.token
        );

        router.replace("/game");

      } else {
        alert(data.error || "Login failed");
      }

    } catch {
      alert("Network error");
    }
  }}
>
  <Text style={styles.mainButtonText}>
    LOGIN
  </Text>
</Pressable>

            {/* FORGOT PASSWORD */}

            <Pressable style={styles.linkButton}>
              <Text style={styles.linkText}>
                Forgot Password?
              </Text>
            </Pressable>

            {/* EXTRA */}

            <Text style={styles.footerText}>
              Secure login powered by MTN Mobile Money
            </Text>

          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  logoText: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    color: "#666",
    marginTop: 6,
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    padding: 5,
    marginBottom: 25,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#111",
  },

  tabText: {
    color: "#555",
    fontWeight: "600",
  },

  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 18,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },

  info: {
    color: "#666",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  mainButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.4,
  },

  mainButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "#dc2626",
    marginBottom: 10,
  },

  linkButton: {
    marginTop: 18,
    alignItems: "center",
  },

  linkText: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  footerText: {
    marginTop: 20,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
    fontSize: 12,
  },
});