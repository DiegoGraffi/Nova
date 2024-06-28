import { useState, useRef } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { Send, Pencil } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Camera } from "expo-camera";
import { useCameraPermissions } from "expo-camera/next";
import { db } from "../db/client";
import { user } from "../db/schema";
import { useNavigation } from "@react-navigation/native";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { eq } from "drizzle-orm";

async function fetchUserFromDB(id: number) {
  const result = await db.select().from(user).where(eq(user.id, id));
  return result[0];
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

async function sendData(jsonData) {
  const body = JSON.stringify(jsonData);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/9.1.0",
    },
    body: body,
  };

  const response = await fetch(
    "http://149.100.142.117:/apinovades/generico/grabarCliente.php",
    options
  );
  console.log(response);
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

function getDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  const formatedDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  return formatedDate;
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
    metodo,
    _m: "homo",
    _r: "json",
    _e: "12",
    _t: "",
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

export default function ViewUserScreen({ route }) {
  const navigation = useNavigation();
  const userId = route.params.userId;

  const { data } = useSuspenseQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUserFromDB(userId),
  });

  const handleSendClient = async () => {
    Alert.alert(
      "Confirmar Envío",
      "¿Estás seguro de que deseas enviar este cliente?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Enviar",
          onPress: async () => {
            const jsonData = await generateJSON({
              metodo: "SetClientes1",
              idopera: generateIdOpera("1099"),
              fecha: getDate(),
              idusuario: "1099",
              dato: data.dato,
              codarea: data.codarea,
              telefono: data.telefono,
              foto1: data.foto1,
              foto2: data.foto2,
              foto3: data.foto3,
              foto4: data.foto4,
              foto5: data.foto5,
              foto6: data.foto6,
            });

            sendData(jsonData);
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="w-full h-full bg-white">
      {data.foto1 && (
        <View className="w-full h-[350px] relative">
          <Image source={{ uri: data.foto1 }} className="w-full h-full" />
        </View>
      )}

      <View className="w-full p-[15px] space-y-[15px]">
        {data.dato && (
          <View className="w-full p-[15px] border-[.5px] border-gray-600 bg-[#eff1f4]">
            <Text className="text-center">{data.dato}</Text>
          </View>
        )}

        {data.codarea && data.telefono && (
          <View className="w-full p-[15px] border-[.5px] border-gray-600 bg-[#eff1f4]">
            <Text className="text-black text-center text-[16px]">
              {data.codarea} 15 {data.telefono}
            </Text>
          </View>
        )}
        <View className="w-full p-[15px] border-[.5px] border-gray-600 bg-[#eff1f4]">
          <Text className="text-black text-center text-[16px]">
            {data.fecha}
          </Text>
        </View>
        {data.foto2 || data.foto3 || data.foto4 || data.foto5 || data.foto6 ? (
          <ScrollView
            horizontal={true}
            className="border-[.5px] border-gray-600 bg-[#eff1f4]"
            contentContainerStyle={{ padding: 15 }}
          >
            <View className="flex flex-row space-x-[15px] overflow-hidden">
              {data.foto2 && (
                <View className="w-[200px] h-[300px] relative p-2">
                  <View className="z-40 bg-white w-full flex justify-center items-center py-2">
                    <Text>DNI Frente</Text>
                  </View>
                  <Image
                    source={{ uri: data.foto2 }}
                    className="object-cover w-[200px] h-[300px] absolute"
                  />
                </View>
              )}

              {data.foto3 && (
                <View className="w-[200px] h-[300px] relative p-2">
                  <View className="z-40 bg-white w-full flex justify-center items-center py-2">
                    <Text>DNI Reverso</Text>
                  </View>
                  <Image
                    source={{ uri: data.foto3 }}
                    className="object-cover w-[200px] h-[300px] absolute"
                  />
                </View>
              )}

              {data.foto4 && (
                <View className="w-[200px] h-[300px] relative p-2">
                  <View className="z-40 bg-white w-full flex justify-center items-center py-2">
                    <Text>Recibo Sueldo</Text>
                  </View>
                  <Image
                    source={{ uri: data.foto4 }}
                    className="object-cover w-[200px] h-[300px] absolute"
                  />
                </View>
              )}

              {data.foto5 && (
                <View className="w-[200px] h-[300px] relative p-2">
                  <View className="z-40 bg-white w-full flex justify-center items-center py-2">
                    <Text>Boleta Servicio</Text>
                  </View>
                  <Image
                    source={{ uri: data.foto5 }}
                    className="object-cover w-[200px] h-[300px] absolute"
                  />
                </View>
              )}

              {data.foto6 && (
                <View className="w-[200px] h-[300px] relative p-2">
                  <View className="z-40 bg-white w-full flex justify-center items-center py-2">
                    <Text>Boleta servicio</Text>
                  </View>
                  <Image
                    source={{ uri: data.foto6 }}
                    className="object-cover w-[200px] h-[300px] absolute"
                  />
                </View>
              )}
            </View>
          </ScrollView>
        ) : null}

        <TouchableOpacity
          onPress={handleSendClient}
          className="py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF] rounded-md"
        >
          <Send color={"#EFF1F4"} strokeWidth={1.5} />
          <Text className="text-white text-[18px] font-light">
            Enviar Cliente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF] rounded-md"
          onPress={() =>
            navigation.navigate("Editar Cliente", { userId: data.id })
          }
        >
          <Pencil color={"#EFF1F4"} strokeWidth={1.5} />
          <Text className="text-white text-[18px] font-light">
            Editar Cliente
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
