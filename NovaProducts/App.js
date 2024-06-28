import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Home from "./screens/Home";

const queryClient = new QueryClient();

export default function Inicio() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor={"#2b2b2e"} />
        <Home />
      </ScrollView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ececec",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#2a2c2f",
  },
  dataContainer: {
    backgroundColor: "#ececec",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "100%",
    gap: 15,
  },
});
