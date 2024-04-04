import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from "react-native";
import { Image } from "react-native";
import { useState, useEffect } from "react";
import {
  ScanBarcode,
  Phone,
  X,
  RefreshCw,
  Trash2,
  Camera,
} from "lucide-react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { FlatGrid } from "react-native-super-grid";

export default function HomeScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [capturedImages, setCapturedImages] = useState({});
  const [currentItem, setCurrentItem] = useState("");
  const [prefix, setPrefix] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullImageUri, setFullImageUri] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    setScanned(true);
    Alert.alert("Codigo escaneado", `Datos obtenidos:  ${data}`, [
      { text: "Ok", onPress: () => setScanned(false) },
    ]);
    setShowCamera(false);
  };

  const handleData = ({ data }) => {
    return data.split("@");
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCamera() {
    setShowCamera(!showCamera);
  }

  const __takePicture = async () => {
    const photo = await cameraRef.takePictureAsync();
    setCapturedImages((prevImages) => ({
      ...prevImages,
      [currentItem]: photo.uri,
    }));
    setShowCamera(false);
  };

  const handleOpenImage = (imageUri) => {
    setFullImageUri(imageUri);
  };

  const handleCloseImage = () => {
    setFullImageUri(null);
  };

  console.log(permission);
  console.log(capturedImages);
  console.log(prefix);
  console.log(phoneNumber);

  const items = [
    { name: "Foto Cliente", funcion: () => setCurrentItem("Foto Cliente") },
    { name: "DNI Frente", funcion: () => setCurrentItem("DNI Frente") },
    { name: "DNI Reverso", funcion: () => setCurrentItem("DNI Reverso") },
    { name: "Recibo Sueldo", funcion: () => setCurrentItem("Recibo Sueldo") },
    {
      name: "Boleta Servicio",
      funcion: () => setCurrentItem("Boleta Servicio"),
    },
    {
      name: "Boleta Servicio 2",
      funcion: () => setCurrentItem("Boleta Servicio 2"),
    },
  ];

  return (
    <>
      <Modal
        visible={fullImageUri !== null}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.fullImageContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseImage}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: fullImageUri }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
      {showCamera === false ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
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
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 0.3,
                    width: "80%",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  {scannedData ? (
                    handleData({ data: scannedData }).map((item, index) => (
                      <Text key={index} style={styles.data}>
                        {item}
                      </Text>
                    ))
                  ) : (
                    <Text>Escanear codigo</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.barCodeIcon}
                  onPress={toggleCamera}
                >
                  <ScanBarcode color={"black"} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.phoneContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.phoneTitle}>Telefono</Text>
                <Phone color={"black"} style={styles.phoneIcon} />
              </View>
              <View style={styles.phoneInputsContainer}>
                <TextInput
                  style={styles.phoneInputBefore}
                  onChangeText={(text) => setPrefix(text)}
                />
                <Text style={styles.phoneNumber}>15</Text>
                <TextInput
                  style={styles.phoneInputAfter}
                  onChangeText={(text) => setPhoneNumber(text)}
                />
              </View>
            </View>

            <View style={styles.imagesContainer}>
              <Text>Fotos</Text>
              <FlatGrid
                itemDimension={140}
                data={items}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => (
                  <>
                    <View style={styles.itemContainer}>
                      {capturedImages[item.name] ? (
                        <Image
                          source={{ uri: capturedImages[item.name] }}
                          style={styles.itemImage}
                        />
                      ) : (
                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Camera
                            color={"black"}
                            strokeWidth={1.5}
                            onPress={() => {
                              setCurrentItem(item.name);
                              setShowCamera(true);
                            }}
                          />
                        </View>
                      )}
                      {capturedImages[item.name] && (
                        <Text
                          style={{
                            position: "absolute",
                            zIndex: 50,
                            backgroundColor: "white",
                            color: "black",
                            padding: 4,
                            position: "absolute",
                            top: 5,
                            left: 5,
                            borderRadius: 2,
                          }}
                        >
                          {item.name}
                        </Text>
                      )}
                      {capturedImages[item.name] && (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 4,
                            bottom: 2,
                            position: "absolute",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              handleOpenImage(capturedImages[item.name])
                            }
                            style={{
                              paddingHorizontal: 7,
                              borderWidth: 0.3,
                              borderRadius: 3,
                              backgroundColor: "white",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text>Ver imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "white",
                              padding: 3,
                              borderWidth: 0.3,
                              borderRadius: 3,
                            }}
                            onPress={() => {
                              setCurrentItem(item.name);
                              setShowCamera(true);
                            }}
                          >
                            <RefreshCw
                              color="black"
                              strokeWidth={1.5}
                              size={24}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </>
                )}
              />
            </View>

            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.textButton}>Cargar Cliente</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Modal style={{ flex: 1 }}>
          <CameraView
            ref={(ref) => (cameraRef = ref)}
            facing={facing}
            style={{ flex: 1, justifyContent: "flex-end" }}
            barcodeScannerSettings={{
              barcodeTypes: ["pdf417"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={toggleCameraFacing}
                  style={{
                    height: 35,
                    width: 35,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <RefreshCw color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    borderWidth: 6,
                    borderColor: "#cccccc",
                  }}
                />

                <TouchableOpacity
                  onPress={toggleCamera}
                  style={{
                    height: 35,
                    width: 35,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <X color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
          </CameraView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    position: "relative",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    gap: 15,
  },
  generalData: {
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
  dataContainer: {},
  dataTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  data: {},
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
  phoneContainer: {
    borderWidth: 0.3,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  phoneTitle: {},
  phoneInputsContainer: {
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    position: "relative",
  },
  phoneNumber: {
    flexDirection: "row",
    width: "10%",
    fontSize: 20,
    textAlign: "center",
  },
  phoneInputBefore: {
    borderWidth: 0.3,
    width: "20%",
    padding: 5,
    paddingLeft: 10,
    fontSize: 20,
    height: "100%",
    borderRadius: 5,
  },
  phoneInputAfter: {
    borderWidth: 0.3,
    width: "70%",
    padding: 5,
    paddingLeft: 10,
    fontSize: 20,
    height: "100%",
    borderRadius: 5,
  },
  phoneIcon: {},
  imagesContainer: {
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 10,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "relative",
    overflow: "hidden",
    height: 150,
    borderWidth: 0.3,
  },
  itemName: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "300",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#000000",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  sendButton: {
    borderWidth: 0.3,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
  },
  fullImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 999,
  },
  closeButtonText: {
    fontSize: 18,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
});
