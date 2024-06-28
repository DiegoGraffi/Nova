import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { db, user } from "../db/client";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "../utils/store/clientStore.ts";
import { eq } from "drizzle-orm";

export default function EditClientScreen({ route }) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { client } = route.params;
  const {
    scannedData,
    setScannedData,
    prefix,
    setPrefix,
    phoneNumber,
    setPhoneNumber,
  } = useStore();
  console.log(client);
  console.log(client.telefono);
  console.log(client.client);
  console.log(client.codarea);

  const handleSave = async () => {
    await db
      .update(user)
      .set({ codarea: prefix, telefono: phoneNumber })
      .where(eq(user.id, client.client));

    queryClient.invalidateQueries({ queryKey: ["users"] });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <View>
        <Text>Prefijo</Text>
        <TextInput value={prefix.toString()} onChangeText={setPrefix} />
      </View>
      <View>
        <Text>Número de teléfono</Text>
        <TextInput
          value={phoneNumber.toString()}
          onChangeText={(text) => setPhoneNumber(parseInt(text))}
        />
      </View>
      <TouchableOpacity onPress={handleSave}>
        <Text>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
