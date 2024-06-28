import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "react-native-paper";

const endpoint = "https://endpoint-eta-nine.vercel.app/api/ventas";

export default function Comparativa() {
  const [page, setPage] = useState.apply(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 50, 100]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["ventasTotal"],
    queryFn: async () => {
      const response = await fetch(endpoint);
      const json = await response.json();
      return json;
    },
  });

  const items = data ?? [];

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const SumaPrecios = () => {
    if (!data) return 0;
    const suma = data.reduce(
      (total, item) => total + parseFloat(item.Precio),
      0
    );
    return suma
      .toLocaleString("es-ES", { style: "currency", currency: "Ars" })
      .replace("ARS", "");
  };

  const formatearPrecio = (precio) => {
    return precio
      .toLocaleString("es-ES", { style: "currency", currency: "Ars" })
      .replace("ARS", "");
  };

  const formatearFechaHora = (fechaHora) => {
    const [fechaStr, horaStr] = fechaHora.split(" ");

    const [diaStr, mesStr, añoStr] = fechaStr
      .split("/")
      .map((part) => part.padStart(2, "0"));
    const [horaStrSinFormato, minutosStr, segundosStr] = horaStr.split(":");
    const horaStrFormateada = horaStrSinFormato.padStart(2, "0");

    const fecha = new Date(
      `${mesStr}/${diaStr}/${añoStr} ${horaStrFormateada}:${minutosStr}:${segundosStr}`
    );

    return `${diaStr}/${mesStr}/${añoStr}\n${horaStrFormateada}:${minutosStr}:${segundosStr}`;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 15,
      }}
    >
      <View style={styles.background}></View>
      <View style={styles.infoContainer}>
        <View style={styles.generalData}>
          <Text style={styles.generalDataTitle}>Ventas Totales</Text>
          <Text style={styles.generalDataNumber}>$ {SumaPrecios(data)}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Filtros</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <ActivityIndicator />}

        {data && (
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>Producto</DataTable.Title>
              <DataTable.Title numeric>Precio</DataTable.Title>
              <DataTable.Title numeric>Sucursal</DataTable.Title>
            </DataTable.Header>
            <View style={styles.table}>
              {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.id} style={styles.tableItem}>
                  <DataTable.Cell>{item.Producto}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    $ {formatearPrecio(item.Precio)}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{item.SucursalVenta}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </View>

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} de ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel={"Filas por página"}
              dropdownItemRippleColor="#005ce7"
              selectPageDropdownRippleColor="#005ce7"
              style={styles.pagination}
            />
          </DataTable>
        )}
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
    backgroundColor: "#2b2b2e",
  },
  infoContainer: {
    zIndex: 20,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 15,
  },
  generalData: {
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 80,
    marginBottom: 15,
  },
  generalDataTitle: {
    color: "#005ce7",
    fontFamily: "MontserratMedium",
    fontSize: 20,
  },
  generalDataNumber: {
    color: "#005ce7",
    fontFamily: "MontserratBold",
    fontSize: 32,
    marginTop: 10,
    marginBottom: 15,
  },

  table: {
    borderRadius: 10,
    overflow: "hidden",
  },
  tableHeader: {
    borderBottomWidth: 0,
  },
  tableItem: {
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textButton: {
    color: "#005ce7",
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    padding: 0,
    marginTop: 10,
  },
});
