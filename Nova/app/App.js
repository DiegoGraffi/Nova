import { useCallback, useEffect } from "react";
import "react-native-gesture-handler";
import Navigation from "./Navigation";
import { StyleSheet } from "react-native";
import Navbar from "./components/Navbar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerTranslation, es } from "react-native-paper-dates";
import { AuthProvider, useAuth } from "./context/AuthContext";

registerTranslation("en", es);

const queryClient = new QueryClient();

export default function App() {
  const { authState } = useAuth();

  const [fontsLoaded] = useFonts({
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          style={"light"}
          backgroundColor={authState?.authenticated ? "#005ce7" : "#2a2c2f"}
        />
        <SafeAreaView style={styles.container} onLayout={onLayout}>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </SafeAreaView>
      </QueryClientProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
