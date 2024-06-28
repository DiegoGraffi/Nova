import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";

import Navbar from "../components/Navbar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, Suspense, useEffect, useRef } from "react";
import { fetchProductByCode } from "../lib/api";
import ProductInfo from "../components/ProductInfo";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { X, Flashlight } from "lucide-react-native";

export default function Home() {
  const [code, setCode] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setShowCamera(false);
    setCode(data);
    setInputValue(data);
  };

  function toggleCamera() {
    setShowCamera(!showCamera);
  }

  const inputRef = useRef(null);

  const clearScreen = () => {
    setInputValue("");
    setCode("");
    inputRef.current.focus();
  };

  const handleDelete = () => {
    clearScreen();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar
        setCode={setCode}
        toggleCamera={toggleCamera}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleDelete={handleDelete}
        inputRef={inputRef}
      />
      <ScrollView style={styles.container}>
        {code !== "" && (
          <Suspense
            fallback={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 200,
                }}
              >
                <Text>Cargando</Text>
              </View>
            }
          >
            <ProductFinder code={code} />
          </Suspense>
        )}
      </ScrollView>
      {showCamera && (
        <Modal animationType="slide" transparent={true} visible={showCamera}>
          <CameraView
            style={{ flex: 1 }}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "code39"],
            }}
            onBarcodeScanned={handleBarCodeScanned}
            // enableTorch={true}
          >
            <View
              style={{
                position: "absolute",
                padding: 20,
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  top: 0,
                  right: 0,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={toggleCamera}>
                  <X color="white" size={32} />
                </TouchableOpacity>
              </View>
              {/* Agregar Flash */}
              {/* <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderRadius: 100,
                    backgroundColor: "white",
                  }}
                >
                  <Flashlight color="black" size={32} />
                </TouchableOpacity>
              </View> */}
            </View>
          </CameraView>
        </Modal>
      )}

      {!showCamera && code === "" && <Welcome />}
    </SafeAreaView>
  );
}

type ProductFinderProps = {
  code: string;
};
function ProductFinder(props: ProductFinderProps) {
  const { code } = props;

  const { data } = useSuspenseQuery({
    queryKey: ["dataProducto", code],
    queryFn: async () => {
      return await fetchProductByCode(code);
    },
  });
  console.log(JSON.stringify(data, null, 2));

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data && !data.data) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [data, code]);

  return (
    <>
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#005ce7",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>
                Producto no encontrado
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    color: "blue",
                    marginTop: 30,
                    fontSize: 16,
                    backgroundColor: "white",
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Cerrar
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      {data.data && <ProductInfo data={data.data} code={code} />}
    </>
  );
}

function Welcome() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginTop: 200,
      }}
    >
      <View style={{ paddingHorizontal: 30 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#005CE7",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Bienvenido
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ececec",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
