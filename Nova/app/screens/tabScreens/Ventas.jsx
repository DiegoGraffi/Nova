import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Filter } from "lucide-react-native";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import { DatePickerModal } from "react-native-paper-dates";
import Collapsible from "react-native-collapsible";

let deviceWidth = Dimensions.get("window").width;

const endpoint = "https://endpoint-eta-nine.vercel.app/api/ventas";

export default function VentasTotal() {
  const [selectedSucursal, setSelectedSucursal] = useState("");
  const [selectedTiempo, setSelectedTiempo] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [importesPorSeccion, setImportesPorSeccion] = useState([]);
  const [generalNumber, setGeneralNumber] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["ventasTotal"],
    queryFn: async () => {
      const response = await fetch(endpoint);
      const json = await response.json();
      return json;
    },
  });

  useEffect(() => {
    if (data) {
      setFilteredList(data);
      calcularImportesPorSeccion(data);

      const suma = data.reduce(
        (total, item) => total + parseFloat(item.Precio),
        0
      );

      setGeneralNumber(suma);
    }
  }, [data]);

  const calcularImportesPorSeccion = (data) => {
    const importes = data.reduce((acc, item) => {
      const { Seccion, Detalle, Precio } = item;
      if (!acc[Seccion]) {
        acc[Seccion] = { Seccion, Detalle, Importe: Precio };
      } else {
        acc[Seccion].Importe += Precio;
      }
      return acc;
    }, {});

    const importesArray = Object.values(importes);
    setImportesPorSeccion(importesArray);
  };

  const items = data ?? [];

  const handleFiltrar = () => {
    let filteredData = data;

    if (selectedSucursal && selectedSucursal.length > 0) {
      filteredData = filteredData.filter((producto) =>
        selectedSucursal.some((sucursal) =>
          producto.SucursalVenta.includes(sucursal)
        )
      );
    }

    setFilteredList(filteredData);
    calcularImportesPorSeccion(filteredData);

    const suma = filteredData.reduce(
      (total, item) => total + parseFloat(item.Precio),
      0
    );

    setGeneralNumber(suma);
  };

  const listaSucursales = items.reduce((lista, productos) => {
    if (!lista.includes(productos.SucursalVenta)) {
      lista.push(productos.SucursalVenta);
    }
    return lista;
  }, []);

  const listaRangoFechas = [
    "Todo",
    "Hoy",
    "Semana",
    "Mes",
    "Año",
    "Personalizado",
  ];

  const formatoFecha = (fechaString) => {
    const separar = fechaString.split(" ");
    const separarFecha = separar[0].split("/");
    const dia = parseInt(separarFecha[0]);
    const mes = parseInt(separarFecha[1]) - 1;
    const anio = parseInt(separarFecha[2]);
    return new Date(anio, mes, dia);
  };

  const SumaImportes = () => {
    if (!importesPorSeccion || importesPorSeccion.length === 0) return 0;
    const suma = importesPorSeccion.reduce(
      (total, item) => total + parseFloat(item.Importe),
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

  const handleCustomDateSelect = () => {
    setSelectedTiempo("Personalizado");
    setShowDatePicker(true);
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
    setShowDatePicker(false);
  }, [setOpen, setShowDatePicker]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setShowDatePicker(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange, setShowDatePicker]
  );

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
          <Text style={styles.generalDataTitle}>Ventas</Text>
          <Text style={styles.generalDataNumber}>
            {" "}
            $ {formatearPrecio(generalNumber)}
          </Text>
          <TouchableOpacity
            onPress={toggleCollapsed}
            style={styles.filterButton}
          >
            <Text style={styles.butttonText}>Filtros</Text>
            <Filter color="#005ce7" size={18} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed} style={styles.inputsContainer}>
            <View style={[styles.inputContainer, { width: deviceWidth - 60 }]}>
              <MultipleSelectList
                setSelected={(val) => setSelectedSucursal(val)}
                data={listaSucursales}
                save="value"
                label="Sucursal"
                fontFamily="MontserratMedium"
                placeholder="Sucursal"
                search={false}
                closeicon={
                  <Ionicons name="close-sharp" size={24} color="black" />
                }
                boxStyles={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                  width: "100%",
                  alignItems: "center",
                  paddingVertical: 15,
                  marginBottom: 0,
                }}
                dropdownStyles={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                }}
                badgeStyles={{ backgroundColor: "#2a2a2d", fontSize: 1 }}
              />
            </View>
            <View style={styles.inputContainer}>
              <SelectList
                setSelected={(val) => {
                  if (val === "Personalizado") {
                    handleCustomDateSelect();
                  } else {
                    setSelectedTiempo(val);
                    setShowDatePicker(false);
                  }
                }}
                data={listaRangoFechas}
                save="value"
                label="Rango de fechas"
                fontFamily="MontserratMedium"
                placeholder="Rango de tiempo"
                search={false}
                boxStyles={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                  alignItems: "center",
                  paddingVertical: 15,
                  marginBottom: 0,
                }}
                dropdownStyles={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                }}
              />
            </View>
            {selectedTiempo === "Personalizado" ? (
              <View style={styles.datesContainer}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateBadgeSpan}>Fecha Inicial</Text>
                  <Text style={styles.dateBadge}>
                    {range.startDate
                      ? range.startDate.toLocaleDateString("es-ES")
                      : "No date selected"}
                  </Text>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateBadgeSpan}>Fecha Final</Text>
                  <Text style={styles.dateBadge}>
                    {range.endDate
                      ? range.endDate.toLocaleDateString("es-ES")
                      : "No date selected"}
                  </Text>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={handleFiltrar}
            >
              <Text style={styles.butttonText}>Aplicar filtros</Text>
            </TouchableOpacity>
          </Collapsible>
        </View>

        {isLoading && <ActivityIndicator style={styles.indicator} />}
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Seccion</DataTable.Title>
          <DataTable.Title>Detalle</DataTable.Title>
          <DataTable.Title numeric>Importe</DataTable.Title>
        </DataTable.Header>
        {importesPorSeccion && (
          <View style={styles.table}>
            {importesPorSeccion.map((item) => (
              <DataTable.Row key={item.Seccion} style={styles.tableItem}>
                <DataTable.Cell>{item.Seccion}</DataTable.Cell>
                <DataTable.Cell numberOfLines={2}>
                  {item.Detalle}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  $ {formatearPrecio(item.Importe)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </View>
        )}

        {showDatePicker && (
          <DatePickerModal
            locale="en"
            mode="range"
            visible={showDatePicker}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
          />
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
    backgroundColor: "#005ce7",
    padding: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  generalDataTitle: {
    color: "#fff",
    fontFamily: "MontserratMedium",
    fontSize: 20,
  },
  generalDataNumber: {
    color: "#fff",
    fontFamily: "MontserratBold",
    fontSize: 32,
    marginTop: 10,
    marginBottom: 15,
  },
  table: {
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 0,
  },

  collapseButton: {
    width: "100%",
  },
  inputContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "auto",
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  button: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  butttonText: {
    color: "#005ce7",
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 25,
  },
  datesContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
    paddingVertical: 20,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  dateContainer: {
    justifyContent: "center",
  },
  dateBadgeSpan: {
    color: "#2b2b2e",
    fontFamily: "MontserratMedium",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12,
  },
  dateBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: "#fff",
    fontSize: 12,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "MontserratMedium",
    backgroundColor: "#2b2b2e",
  },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
  },
});
