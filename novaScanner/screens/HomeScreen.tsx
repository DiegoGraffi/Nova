import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import { ScanBarcode, Phone } from "lucide-react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function HomeScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  if (device == null)
    return (
      <View>
        <Text>No camera device error</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.generalData}>
          <View style={styles.generalDataCol1}>
            <Text style={styles.generalDataTitle}>Carga de Cliente</Text>
            <Text style={styles.generalDataDate}>06-03-2024 11:15:33</Text>
          </View>

          <View style={styles.generalDataCol2}>
            <Text>Socket</Text>
            <Text>192.168.1.41 501</Text>
          </View>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Datos</Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <View
              style={{
                borderWidth: 0.3,
                width: "80%",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={styles.data}>Datos</Text>
            </View>

            <View>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
              />
            </View>

            <TouchableOpacity style={styles.barCodeIcon}>
              <ScanBarcode color={"black"} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.phoneContainer}>
          <Text style={styles.phoneTitle}>Telefono</Text>
          <View style={styles.phoneInputsContainer}>
            <Text style={styles.phoneNumber}>15</Text>
            <TextInput style={styles.phoneInput} />
          </View>
          <Phone color={"black"} style={styles.phoneIcon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  generalData: {
    padding: 15,
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  generalDataCol1: {
    width: "60%",
  },
  generalDataCol2: {
    width: "40%",
    alignItems: "flex-end",
  },
  generalDataTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  generalDataDate: {},
  dataContainer: {
    padding: 15,
  },
  dataTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  data: {
    height: 200,
  },
  barCodeIcon: {
    padding: 5,
    borderWidth: 0.3,
    borderRadius: 5,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ececec",
  },
  phoneContainer: {},
  phoneTitle: {},
  phoneInputsContainer: {},
  phoneNumber: {},
  phoneInput: {},
  phoneIcon: {},
});
