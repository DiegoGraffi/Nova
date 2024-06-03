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
      <View className="p-[10px] w-[30%] aspect-square rounded-full overflow-hidden relative justify-center items-center border-[.5px] border-gray-600">
        {foto1 ? (
          <Image
            source={{ uri: foto1 }}
            className="absolute object-cover w-full h-full scale-125"
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
      <View className="flex-col p-[10px] w-[65%] relative">
        <Text className="text-[16px]">{client}</Text>
        <Text className="text-black">{date}</Text>
        <Text className="text-[16px] text-blue-500">
          {codarea} 15 {telefono}
        </Text>

        <View className="mt-[15px] flex flex-row justify-between relative">
          <TouchableOpacity
            className="border-[.5px] border-gray-600 p-[15px] justify-center items-center w-[70%]"
            onPress={() =>
              navigation.navigate("Detalle Cliente", {
                client: {
                  client,
                  codarea,
                  telefono,
                  foto1,
                  foto2,
                  foto3,
                  foto4,
                  foto5,
                  foto6,
                  date,
                },
              })
            }
          >
            <Text className="text-[16px] font-normal text-[#3f74ff]">
              Ver Cliente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border-[.5px] border-gray-600 border-l-0  p-[15px] justify-center items-center flex w-[30%]"
            onPress={() => handleDelete(id)}
          >
            <Trash2 color={"red"} strokeWidth={1} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
