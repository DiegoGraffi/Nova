import React from "react";
import { StyleSheet, View } from "react-native";

import ItemTableroMonth from "./ItemTableroMonth";
import ItemTableroLast from "./ItemTableroLast";
import ItemTableroYear from "./ItemTableroYear";

export default function Tablero() {
  return (
    <View style={styles.container}>
      <View style={styles.tableroContainerGrid}>
        <ItemTableroMonth
          title="Clientes Nuevos este"
          span="Mes"
          number="22.61"
          icon="people-sharp"
          before={230}
          after={282}
        />
        <ItemTableroYear
          title="Clientes Nuevos este"
          span="Año"
          number="-17.72"
          icon="people-sharp"
          before={5377}
          after={4424}
        />
        <ItemTableroMonth
          title="Operaciones Ventas este"
          span="Mes"
          number="-41.94"
          icon="analytics-outline"
          before={200}
          after={200}
        />
        <ItemTableroYear
          title="Operaciones Ventas este"
          span="Año"
          number="-40.36"
          icon="analytics-outline"
          before={1050}
          after={1608}
        />
        <ItemTableroLast
          title="Creditos Otorgados este"
          span="Mes"
          number="-40.36"
          icon="card-outline"
          color={"red"}
          before={1478}
          after={1400}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  tableroContainerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  layoutButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: "#00000050",
    padding: 5,
    marginBottom: 15,
  },
  layoutButton: {
    padding: 10,
    borderWidth: 0.3,
    borderRadius: 5,
  },
});
