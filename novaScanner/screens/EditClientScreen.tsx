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
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <View>
        <Text>Prefijo</Text>
        <TextInput
          value={prefix.toString()}
          onChangeText={(v) => setPrefix(parseInt(v))}
        />
      </View>
      <View>
        <Text>Número de teléfono</Text>
        <TextInput
          value={phone.toString()}
          onChangeText={(text) => setPhone(parseInt(text))}
        />
      </View>
      <TouchableOpacity onPress={handleSave}>
        <Text>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
