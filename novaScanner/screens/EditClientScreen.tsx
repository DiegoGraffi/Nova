import React, { useState, useEffect, Suspense } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "../db/client";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useStore } from "../utils/store/clientStore.ts";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";
import { Save } from "lucide-react-native";

export default function EditClientWrapper(props: any) {
  return (
    <Suspense fallback={<Text>Cargando</Text>}>
      <EditClientScreen {...props} />
    </Suspense>
  );
}

async function fetchUser(id: number) {
  const results = await db.select().from(user).where(eq(user.id, id));

  return results[0];
}

export function EditClientScreen({ route }) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const userId = route.params.userId;

  const { data: client } = useSuspenseQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  });

  console.log(client);
  const [phone, setPhone] = useState(client.telefono);
  const [prefix, setPrefix] = useState(client.codarea);

  const handleSave = async () => {
    await db
      .update(user)
      .set({ codarea: prefix, telefono: phone })
      .where(eq(user.id, client.id));

    queryClient.invalidateQueries({ queryKey: ["users"] });

    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 15,
        backgroundColor: "white",
      }}
    >
      
      <Text>Telefono</Text>
      <View className="flex-row items-center w-full mt-[15px] relative">
        <TextInput
          className="w-[20%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full border-[.5px] border-gray-600 rounded-md"
          keyboardType="numeric"
          value={prefix}
          value={prefix.toString()}
          onChangeText={(v) => setPrefix(v)}
        />
        <Text className="w-[20%] text-[24px] text-center">15</Text>
        <TextInput
          className="w-[60%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full border-[.5px] border-gray-600 rounded-md"
          keyboardType="numeric"
          value={phone.toString()}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <TouchableOpacity
        className="py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF] rounded-md mt-[15px]"
        onPress={handleSave}
      >
        <Save color={"#EFF1F4"} strokeWidth={1.5} />

        <Text className="text-white text-[18px] font-light">
          Guardar Cambios
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
