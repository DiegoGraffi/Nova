import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./Navigation";
import Navbar from "./components/Navbar";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { db } from "./db/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
