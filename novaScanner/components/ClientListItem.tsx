import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, Image, Button } from "react-native";
import { Trash2 } from "lucide-react-native";
import { useStore } from "../utils/store/clientStore";

type ClientProps = {
  client: string;
  id: number;
  codarea: number;
  telefono: number;
  foto1: string;
  foto2: string;
  foto3: string;
  foto4: string;
  foto5: string;
  foto6: string;
  date: string;
};

type ClientListItemProps = ClientProps & {
  handleDelete: (id: number) => void;
};

export default function ClientListItem({
  client,
  handleDelete,
  id,
  codarea,
  telefono,
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6,
  date,
}: ClientListItemProps) {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row justify-between items-center border-b-[.5px] border-b-gray-600 p-[15px]">
      <View className="p-[10px] w-[30%] aspect-square overflow-hidden relative justify-center items-center rounded-full">
        {foto1 ? (
          <Image
            source={{ uri: foto1 }}
            className="absolute object-cover w-full h-full scale-100 rounded-full"
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
      <View className="flex-col p-[10px] w-[65%] relative">
        <Text className="text-[14px]">{client}</Text>
        <Text className="text-[14px]">{date}</Text>

        <View className="mt-[15px] flex flex-row justify-between relative">
          <TouchableOpacity
            className="border-[.5px] border-gray-600 p-[10px] justify-center items-center w-[70%] rounded-l-md"
            onPress={() =>
              navigation.navigate("Detalle Cliente", {
                userId: id,
              })
            }
          >
            <Text className="text-[16px] font-normal text-[#3f74ff]">
              Ver Cliente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border-[.5px] border-gray-600 border-l-[.5px] p-[10px] justify-center items-center flex w-[30%] rounded-r-md bg-[#eff1f4]"
            onPress={() => handleDelete(id)}
          >
            <Trash2 color={"red"} strokeWidth={1} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
