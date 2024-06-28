import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Cajas() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingVertical: 15,
      }}
    >
      <View style={styles.background}></View>
      <View style={styles.infoContainer}>
        <View style={styles.generalDataContainer}>
          <View styles={styles.saldoTotalContainer}>
            <Text style={styles.saldoTotalTitle}>Disponible</Text>
            <Text style={styles.saldoTotalNumber}>$ 12.154.789,12</Text>
          </View>
          <View style={styles.totalesContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalTitle}>Total Efectivo</Text>
              <Text style={styles.totalNumber}>$ 8.456.874,07</Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalTitle}>Total otros ingresos</Text>
              <Text style={styles.totalNumber}>$26.598.114,87</Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalTitle}>Total Egresos</Text>
              <Text style={styles.totalNumber}>$ 5.641.322,54</Text>
            </View>
          </View>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxTitle}>N° Sucursales</Text>
              <FontAwesome6
                name="store"
                size={20}
                style={{ color: "#005ce7" }}
              />
            </View>
            <Text style={styles.boxNumber}>12</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxTitle}>N° Cajas</Text>
              <FontAwesome6
                name="cash-register"
                size={20}
                style={{ color: "#005ce7" }}
              />
            </View>
            <Text style={styles.boxNumber}>23</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("CajasList")}
          style={styles.button}
        >
          <Text style={styles.butttonText}>Ver cajas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#ececec",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#2b2b2e",
  },
  infoContainer: {
    zIndex: 20,
    backgroundColor: "#ececec",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  generalDataContainer: {
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#005ce7",
  },
  saldoTotalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  saldoTotalTitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MontserratMedium",
  },
  saldoTotalNumber: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "MontserratBold",
  },
  totalesContainer: {
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#fff",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
  },
  totalTitle: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "MontserratMedium",
    marginRight: 15,
  },
  totalNumber: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "MontserratBold",
    textAlign: "right",
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: 15,
  },
  box: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 10,
    padding: 10,
  },
  boxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#005ce7",
  },
  boxTitle: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  boxNumber: {
    width: "100%",
    textAlign: "center",
    fontSize: 60,
    padding: 20,
    fontFamily: "MontserratBold",
  },
  button: {
    marginTop: 15,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  butttonText: {
    color: "#005ce7",
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
});
