import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Caja = ({ item }) => {
  const navigation = useNavigation();

  const indicatorColor = () => {
    return item.Estado === "Cerrada" ? "#FF4141" : "#2BD24C";
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CajaDetail", { item })}
      style={styles.cajaContainer}
    >
      <View
        style={[styles.indicator, { backgroundColor: indicatorColor() }]}
      ></View>
      <View style={styles.cajaHeader}>
        <View style={styles.cajaSucursal}>
          <FontAwesome6
            name="store"
            size={20}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontFamily: "MontserratMedium", color: "#fff" }}>
            {item.Sucursal}
          </Text>
        </View>
        <View style={styles.cajaNumero}>
          <FontAwesome6
            name="cash-register"
            size={20}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontFamily: "MontserratMedium", color: "#fff" }}>
            {item.NumeroDeCaja}
          </Text>
        </View>
      </View>

      <View style={styles.numerosContainer}>
        <View
          style={[
            styles.row,
            { borderBottomWidth: 0.5, borderBottomColor: "rgba(0,0,0,.5)" },
          ]}
        >
          <View style={styles.box}>
            <Text style={styles.span}>Efectivo: </Text>
            <Text style={styles.data}>{item.Efectivo}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.span}>Otros Ingresos: </Text>
            <Text style={styles.data}>{item.OtrosIngresos}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.span}>Egresos: </Text>
            <Text style={styles.data}>{item.Egresos}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.span}>Disponible: </Text>
            <Text style={styles.data}>{item.Saldo}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Caja;

const styles = StyleSheet.create({
  cajaContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
    marginBottom: 15,
  },
  indicator: {
    width: 10,
    height: 10,
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 100,
  },
  cajaHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#005ce7",
    padding: 10,
    borderRadius: 5,
  },
  cajaSucursal: {
    flexDirection: "row",
    flex: 1,
  },
  cajaNumero: {
    flexDirection: "row",
    flex: 1,
  },
  numerosContainer: {
    flexDirection: "column",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  box: {
    flexDirection: "column",
    flex: 1,
  },
  span: {
    fontFamily: "MontserratBold",
    color: "#000",
  },
  data: {
    fontFamily: "MontserratMedium",
  },
});
