import { ScrollView, StyleSheet, View } from "react-native";
import Tablero from "../../components/Tablero";
import Chart from "../../components/Chart";

export default function Inicio() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: 15,
      }}
    >
      <View style={styles.background}></View>
      <View style={styles.tableroContainer}>
        <Tablero />
        <Chart title="Ventas del ultimo" span=" Año" />
        <Chart title="Operaciones del ultimo" span=" Año" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#2a2c2f",
  },
  tableroContainer: {
    backgroundColor: "#ececec",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
