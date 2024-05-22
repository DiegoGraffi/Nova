import { ScrollView, View, Alert, Button } from "react-native";
import { useState, useEffect } from "react";
import { useCameraPermissions } from "expo-camera/next";
import ViewImageModal from "./ViewImageModal";
import AppInfo from "../components/AppInfo";
import CameraScannerView from "./CameraScannerView";
import PhoneInput from "../components/PhoneInput";
import ClientData from "../components/ClientData";
import ImagesContainer from "../components/ImagesContainer";
import ProfilePicture from "../components/ProfilePicture";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../db/client";
import { user } from "../db/schema";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../utils/store/clientStore";

async function fetchUsersFromDB() {
  return await db.select().from(user);
}

export default function HomeScreen() {
  const {
    setPermission,
    facing,
    scanned,
    setScanned,
    scannedData,
    setScannedData,
    currentItem,
    setCurrentItem,
    prefix,
    setPrefix,
    phoneNumber,
    setPhoneNumber,
    fullImageUri,
    setFullImageUri,
    cameraMode,
    setCameraMode,
    showCamera,
    setShowCamera,
  } = useStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImages, setCapturedImages] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    setPermission(permission);
  }, [permission]);

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
    useStore.setState((state) => ({
      facing: state.facing === "back" ? "front" : "back",
    }));
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

  // Base de datos

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersFromDB,
  });

  const queryClient = useQueryClient();

  const users = data;

  async function handleAddUser() {
    await db.insert(user).values({
      dato: scannedData,
      codaera: parseInt(prefix),
      telefono: parseInt(phoneNumber),
      foto1: capturedImages["Foto Cliente"],
      foto2: capturedImages["DNI Frente"],
      foto3: capturedImages["DNI Reverso"],
      foto4: capturedImages["Recibo Sueldo"],
      foto5: capturedImages["Boleta Servicio"],
      foto6: capturedImages["Boleta Servicio 2"],
    });
    // la data de users esta vieja, actualiza todos los que dependan del key users
    queryClient.invalidateQueries({ queryKey: ["users"] });
    setScannedData("");
    setPrefix("");
    setPhoneNumber("");
    setCapturedImages({});
    navigation.navigate("Listado de Clientes");
  }

  console.log(prefix, phoneNumber);
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

            <Button title="Cargar cliente" onPress={handleAddUser} />
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
