import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./Navigation";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <SafeAreaView
      style={styles.container}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      <Navbar />
      <Navigation />
      <StatusBar style="dark" backgroundColor="white" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
