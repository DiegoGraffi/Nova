import { ScrollView, Button } from "react-native";
import ClientListItem from "../components/ClientListItem";
import {
  useSuspenseQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { db } from "../db/client";
import { user } from "../db/schema";

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

  async function handleAddMockUser() {
    await db.insert(user).values({ name: "Carlitos" });
    // la data de users esta vieja, actualiza todos los que dependan del key users
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15, backgroundColor: "white" }}
    >
      {users?.map((user) => {
        return <ClientListItem client={user.name} key={user.id} />;
      })}
      <Button title="Agregar usuario" onPress={handleAddMockUser} />
    </ScrollView>
  );
}
