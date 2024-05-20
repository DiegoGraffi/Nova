import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Trash2 } from "lucide-react-native";

export default function ClientListItem({
  client,
  handleDelete,
  id,
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6,
}) {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row items-center border-b-[.5px] border-b-gray-600 py-[10px]">
      <View className="p-[10px] w-[30%] aspect-square rounded-full border overflow-hidden">
        <Image source={{ uri: foto1 }} className="object-cover"></Image>
      </View>
      <View className="flex-col p-[10px] w-[70%]">
        <Text className="text-[16px]">{client}</Text>
        <Text className="text-[12px] text-red-500">{foto1}</Text>
        <Text className="text-[12px] text-orange-500">{foto2}</Text>
        <Text className="text-[12px] text-yellow-500">{foto3}</Text>
        <Text className="text-[12px] text-cyan-500">{foto4}</Text>
        <Text className="text-[12px] text-blue-500">{foto5}</Text>
        <Text className="text-[12px] text-purple-500">{foto6}</Text>
        <View className="space-x-[15px] mt-[15px] flex flex-row">
          <TouchableOpacity
            className="bg-[#3f74ff] rounded-[5px] p-[15px] justify-center items-center basis-2/3"
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="text-[16px] font-semibold text-white">
              Ver Cliente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 rounded-[5px] p-[15px] justify-center items-center flex basis-1/3"
            onPress={() => handleDelete(id)}
          >
            <Trash2 color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
