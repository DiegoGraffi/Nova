import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./Navigation";

export default function App() {
  return (
    <SafeAreaView
      style={styles.container}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      <Navigation />
      <StatusBar style="light" backgroundColor="black" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
