import { useEffect, useState } from "react";
import { Redirect } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    checkAuth();

  }, []);

  async function checkAuth() {

    const token = await AsyncStorage.getItem("token");

    setLoggedIn(!!token);

    setLoading(false);
  }

  if (loading) return null;

  return (
    <Redirect
      href={loggedIn ? "/game" : "/auth"}
    />
  );
}