import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useCameraPermissions } from "expo-camera/next";
import ImageSquare from "../components/ImageSquare";
import ViewImageModal from "./ViewImageModal";
import AppInfo from "../components/AppInfo";
import CameraScannerView from "./CameraScannerView";
import Button from "../components/Button";
import PhoneInput from "../components/PhoneInput";
import ClientData from "../components/ClientData";
import ImagesContainer from "../components/ImagesContainer";
import ProfilePicture from "../components/ProfilePicture";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export default function HomeScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [capturedImages, setCapturedImages] = useState({});
  const [currentItem, setCurrentItem] = useState("");
  const [prefix, setPrefix] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullImageUri, setFullImageUri] = useState(null);
  const [cameraMode, setCameraMode] = useState("");
  const [showCamera, setShowCamera] = useState(false);

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
    const photo = await cameraRef.takePictureAsync({
      quality: 1,
      width: 300,
      height: 400,
      exif: false,
    });
    const resizedImage = await manipulateAsync(photo.uri, [], {
      compress: 1,
      format: SaveFormat.JPEG,
    });
    setCapturedImages((prevImages) => ({
      ...prevImages,
      [currentItem]: resizedImage.uri,
    }));
    setShowCamera(false);
  };

  const handleOpenImage = (imageUri) => {
    setFullImageUri(imageUri);
  };

  const handleCloseImage = () => {
    setFullImageUri(null);
  };

  const handleCameraMode = (mode) => {
    setCameraMode(mode);
  };

  console.log(cameraMode);

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
      <ViewImageModal
        fullImageUri={fullImageUri}
        handleCloseImage={handleCloseImage}
      />
      {showCamera === false ? (
        <ScrollView
          className="flex-1 relative w-[100%] bg-white "
          contentContainerStyle={{
            padding: 15,
          }}
        >
          <View className="bg-white rounded-[10px]">
            <AppInfo />
            <ProfilePicture
              items={items}
              capturedImages={capturedImages}
              setCurrentItem={setCurrentItem}
              setShowCamera={setShowCamera}
              handleOpenImage={handleOpenImage}
              handleCameraMode={handleCameraMode}
            />

            <ClientData
              scannedData={scannedData}
              handleData={handleData}
              toggleCamera={toggleCamera}
              handleCameraMode={handleCameraMode}
            />

            <PhoneInput setPrefix={setPrefix} setPhoneNumber={setPhoneNumber} />

            <ImagesContainer
              items={items}
              capturedImages={capturedImages}
              setCurrentItem={setCurrentItem}
              setShowCamera={setShowCamera}
              handleOpenImage={handleOpenImage}
              handleCameraMode={handleCameraMode}
            />

            <Button text={"Cargar Cliente"} />
          </View>
        </ScrollView>
      ) : (
        <CameraScannerView
          __takePicture={__takePicture}
          handleBarCodeScanned={handleBarCodeScanned}
          facing={facing}
          scanned={scanned}
          toggleCamera={toggleCamera}
          toggleCameraFacing={toggleCameraFacing}
          cameraMode={cameraMode}
        />
      )}
    </>
  );
}
