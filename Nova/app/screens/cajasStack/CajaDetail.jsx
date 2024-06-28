import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const CajaDetail = () => {
  const {
    params: { item },
  } = useRoute();

  const getEstadoStyle = (estado) => {
    if (estado === "Cerrada") {
      return styles.estadoRojo;
    } else if (estado === "Abierta") {
      return styles.estadoVerde;
    } else {
      return styles.data;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles Caja {item.NumeroDeCaja}</Text>
      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <View style={styles.dataItem}>
            <Text style={styles.label}>Sucursal: </Text>
            <Text style={styles.data}>{item.Sucursal}</Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.label}>N° de caja: </Text>
            <Text style={styles.data}>{item.NumeroDeCaja}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.dataItem}>
            <Text style={styles.label}>Fecha / Hora apertura: </Text>
            <Text style={styles.data}>{item.FechaHoraApertura}</Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.label}>Fecha / Hora ultima venta: </Text>
            <Text style={styles.data}>{item.FechaHoraUltVenta}</Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.label}>Fecha / Hora ultimo cobro: </Text>
            <Text style={styles.data}>{item.FechaHoraUltCobro}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.dataItem}>
            <Text style={styles.label}>Efectivo: </Text>
            <Text style={styles.data}>{item.Efectivo}</Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.label}>Otros Ingresos: </Text>
            <Text style={styles.data}>{item.OtrosIngresos}</Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.label}>Egresos: </Text>
            <Text style={styles.data}>{item.Egresos}</Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.label}>Disponible: </Text>
            <Text style={styles.data}>{item.Saldo}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.dataItem}>
            <Text style={styles.label}>Estado: </Text>
            <Text style={[getEstadoStyle(item.Estado)]}>{item.Estado}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
    fontFamily: "MontserratBold",
    textAlign: "center",
    paddingVertical: 40,
  },
  dataContainer: {
    borderRadius: 5,
    flexDirection: "column",
  },
  row: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontFamily: "MontserratMedium",
    flex: 1,
    paddingRight: 5,
  },
  data: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#005ce7",
    color: "#fff",
    flex: 1,
    textAlign: "center",
    fontFamily: "MontserratMedium",
  },
  estadoRojo: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#FF4141",
    color: "#fff",
    flex: 1,
    textAlign: "center",
    fontFamily: "MontserratMedium",
  },
  estadoVerde: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#2BD24C",
    color: "#fff",
    flex: 1,
    textAlign: "center",
    fontFamily: "MontserratMedium",
  },
});

export default CajaDetail;
