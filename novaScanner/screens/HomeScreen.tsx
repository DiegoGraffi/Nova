import { ScrollView, View, Alert, Text, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
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
import { UserRoundPlus, Trash2 } from "lucide-react-native";
import * as FileSystem from "expo-file-system";

async function fetchUsersFromDB() {
  return await db.select().from(user);
}

async function convertImageToBase64(imageUri) {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error("Error al convertir la imagen a base64:", error);
    return null;
  }
}

async function generateJSON(data) {
  const {
    metodo,
    idopera,
    fecha,
    idusuario,
    dato,
    codarea,
    telefono,
    ...fotos
  } = data;
  const json = {
    _m: "prod",
    _r: "json",
    _e: "empresa",
    _t: "tabla",
    metodo,
    idopera,
    fecha,
    idusuario,
    dato,
    codarea,
    telefono,
  };

  for (const foto in fotos) {
    if (fotos[foto]) {
      const base64 = await convertImageToBase64(fotos[foto]);
      if (base64) {
        json[foto] = base64;
      }
    }
  }

  return json;
}

function generateIdOpera(idusuario) {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  return `01${idusuario}${year}${month}${day}${hour}${minute}${second}`;
}

export default function HomeScreen({ route }) {
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
    date,
    setDate,
    currentIndex,
    lastIndex,
    setLastIndex,
    capturedImages,
    setCapturedImages,
  } = useStore();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
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

  function toggleCameraFacing() {
    useStore.setState((state) => ({
      facing: state.facing === "back" ? "front" : "back",
    }));
  }

  function toggleCamera() {
    setShowCamera(!showCamera);
  }

  const __takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const { width, height } = photo;
      const lastThreeItems = [
        "Recibo Sueldo",
        "Boleta Servicio",
        "Boleta Servicio 2",
      ];
      const resizeFactor = lastThreeItems.includes(currentItem) ? 0.2 : 0.1;
      const newWidth = width * resizeFactor;
      const newHeight = height * resizeFactor;

      const resizedImage = await manipulateAsync(
        photo.uri,
        [{ resize: { width: newWidth, height: newHeight } }],
        {
          compress: 1,
          format: SaveFormat.JPEG,
        }
      );

      setCapturedImages({
        ...capturedImages,
        [currentItem]: resizedImage.uri,
      });
      setShowCamera(false);
    }
  };

  const handleOpenImage = (imageUri) => {
    setFullImageUri(imageUri);
    setLastIndex(currentIndex);
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

  const queryClient = useQueryClient();

  function getDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    const formatedDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    setDate(formatedDate);
    return formatedDate;
  }

  interface FormErrors {
    scannedData?: string;
    prefix?: string;
    phoneNumber?: string;
    capturedImages?: string;
    date?: string;
  }

  const validateForm = (): FormErrors => {
    const errorsName: FormErrors = {};
    if (!scannedData) errorsName.scannedData = "Datos Documento";
    if (!prefix) errorsName.prefix = "Prefijo";
    if (!phoneNumber) errorsName.phoneNumber = "Número de teléfono";

    const requiredImages = [
      "Foto Cliente",
      "DNI Frente",
      "DNI Reverso",
      "Recibo Sueldo",
      "Boleta Servicio",
      "Boleta Servicio 2",
    ];

    const missingImages = requiredImages.filter(
      (image) => !capturedImages[image]
    );
    if (missingImages.length > 0)
      errorsName.capturedImages = `Faltan las siguientes imágenes:\n${missingImages.join(
        ", "
      )}`;

    return errorsName;
  };

  async function handleAddUser() {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors).join("\n");
      Alert.alert(
        "Datos Faltantes",
        `${errorMessage}\n¿Deseas enviar la información de todas maneras?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Enviar",
            onPress: async () => {
              const formData = {
                metodo: "SetClientes1",
                idopera: generateIdOpera("1"),
                fecha: getDate(),
                idusuario: "1099",
                dato: scannedData,
                codarea: prefix,
                telefono: phoneNumber,
                foto1: capturedImages["Foto Cliente"],
                foto2: capturedImages["DNI Frente"],
                foto3: capturedImages["DNI Reverso"],
                foto4: capturedImages["Recibo Sueldo"],
                foto5: capturedImages["Boleta Servicio"],
                foto6: capturedImages["Boleta Servicio 2"],
              };

              const json = await generateJSON(formData);
              await db.insert(user).values(formData);
              queryClient.invalidateQueries("users");
              console.log(formData);
              setScannedData("");
              setPhoneNumber("");
              setCapturedImages({});
              setDate("");
              navigation.navigate("Clientes");
            },
          },
        ]
      );
      return;
    }

    const formData = {
      metodo: "A",
      idopera: generateIdOpera("1"),
      fecha: getDate(),
      idusuario: 1,
      dato: scannedData,
      codarea: prefix,
      telefono: phoneNumber,
      ...capturedImages,
    };

    const json = await generateJSON(formData);
    await db.insert(user).values(formData);
    queryClient.invalidateQueries("users");
  }

  const handleDeleteData = () => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar todos los datos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setScannedData("");
            setPrefix("");
            setPhoneNumber("");
            setCapturedImages({});
          },
        },
      ]
    );
  };

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
              toggleCamera={toggleCamera}
              handleCameraMode={handleCameraMode}
            />

            <PhoneInput />

            <ImagesContainer
              items={items}
              capturedImages={capturedImages}
              setCurrentItem={setCurrentItem}
              setShowCamera={setShowCamera}
              handleOpenImage={handleOpenImage}
              handleCameraMode={handleCameraMode}
            />

            <TouchableOpacity
              className="py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF] rounded-md"
              onPress={handleAddUser}
            >
              <UserRoundPlus color={"#EFF1F4"} strokeWidth={1.5} />
              <Text className="text-white text-[18px] font-light">
                Cargar Cliente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-red-600 mt-[15px] rounded-md"
              onPress={handleDeleteData}
            >
              <Trash2 color={"#EFF1F4"} strokeWidth={1.5} />
              <Text className="text-white text-[18px] font-light">
                Eliminar Datos
              </Text>
            </TouchableOpacity>
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
          cameraRef={cameraRef}
        />
      )}
    </>
  );
}
