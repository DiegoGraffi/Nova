import { ScrollView, Button, Alert, Text, View } from "react-native";
import ClientListItem from "../components/ClientListItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../db/client";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";

async function fetchUsersFromDB() {
  return await db.select().from(user);
}

export default function UserList() {
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

  console.log(users);
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15, backgroundColor: "white" }}
    >
      <View className="w-[100%] flex-row justify-between items-center p-[15px] bg-[#eff1f4] rounded-[5px]">
        <Text className="text-[16px]">Cantidad de usuarios:</Text>
        <Text className="text-[18px] font-semibold">
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
            client={user.data}
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
