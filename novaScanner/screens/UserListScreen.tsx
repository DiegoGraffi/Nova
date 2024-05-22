import { ScrollView, Button, Alert, Text, View } from "react-native";
import ClientListItem from "../components/ClientListItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../db/client";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import { useStore } from "../utils/store/clientStore";

async function fetchUsersFromDB() {
  return await db.select().from(user);
}

export default function UserList() {
  const { permission } = useStore();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersFromDB,
  });

  const queryClient = useQueryClient();

  const users = data;

  async function handleDelete(clientId) {
    Alert.alert(
      "¿Deseas eliminar al cliente?",
      `Eliminar cliente ${clientId}`,
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancelado"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await db.delete(user).where(eq(user.id, clientId));
            queryClient.invalidateQueries({ queryKey: ["users"] });
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "El cliente no fue eliminado ya que se presiono fuera del modal."
          ),
      }
    );
  }

  console.log(permission);
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
      <View className=" flex-row justify-between items-center p-[15px] border-[.5px] border-gray-600 bg-[#eff1f4] m-[15px]">
        <Text className="text-[16px] text-gray-600">Cantidad de usuarios:</Text>
        <Text className="text-[18px] font-semibold text-gray-600">
          {users
            ? users.length == 0
              ? "No hay clientes cargados"
              : users.length
            : null}
        </Text>
      </View>
      {users?.map((user) => {
        return (
          <ClientListItem
            client={user.dato}
            codarea={user.codaera}
            telefono={user.telefono}
            foto1={user.foto1}
            foto2={user.foto2}
            foto3={user.foto3}
            foto4={user.foto4}
            foto5={user.foto5}
            foto6={user.foto6}
            key={user.id}
            id={user.id}
            handleDelete={handleDelete}
          />
        );
      })}
    </ScrollView>
  );
}
