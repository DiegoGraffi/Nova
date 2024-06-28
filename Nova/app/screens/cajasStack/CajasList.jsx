import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import dataCajas from "../../data/cajas";

import { Ionicons } from "@expo/vector-icons";
import Caja from "../../components/Caja";
import Collapsible from "react-native-collapsible";
import { Filter } from "lucide-react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const endpoint = "https://endpoint-eta-nine.vercel.app/api/ventas";

export default function CajasList() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedSucursal, setSelectedSucursal] = useState("");

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

  const items = data ?? [];

  const listaSucursales = items.reduce((lista, productos) => {
    if (!lista.includes(productos.SucursalVenta)) {
      lista.push(productos.SucursalVenta);
    }
    return lista;
  }, []);

  return (
    <View
      style={styles.container}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      <View>
        <Text style={styles.listTitle}>Lista de cajas</Text>
        <Text style={styles.listDescription}>
          Para obtener más información sobre una caja registradora específica,
          simplemente presiona sobre ella y accede a detalles adicionales
        </Text>

        <TouchableOpacity
          onPress={toggleCollapsed}
          style={[styles.filterButton, { marginTop: 15 }]}
        >
          <Text style={styles.butttonText}>Filtros</Text>
          <Filter color="#005ce7" size={18} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
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
              badgeStyles={{ backgroundColor: "#005ce7", fontSize: 1 }}
            />
          </View>

          <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
            <Text style={styles.butttonText}>Aplicar filtros</Text>
          </TouchableOpacity>
        </Collapsible>
        <View
          style={{
            borderRadius: 10,
            overflow: "hidden",
            marginTop: 15,
          }}
        >
          <FlatList
            data={dataCajas}
            keyExtractor={(item) => item.Efectivo.toString()}
            renderItem={({ item }) => <Caja item={item} />}
            style={styles.listContainer}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  input: {
    borderWidth: 0.3,
    borderColor: "#005ce7",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  butttonText: {
    color: "#005ce7",
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  listTitle: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  listDescription: {
    color: "#00000090",
    marginTop: 10,
    fontSize: 14,
    fontFamily: "MontserratMedium",
  },
  listContainer: {
    borderRadius: 10,

    height: "75%",
    overflow: "hidden",
  },

  inputContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  button: {
    width: "100%",
    borderRadius: 10,
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
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
});
