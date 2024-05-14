import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export default function ClientListItem({ client }) {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row items-center border-b-[.5px] border-b-gray-600 py-[10px]">
      <View className="p-[10px] w-[30%]">
        <View className="bg-[#eff1f4] rounded-full aspect-square"></View>
      </View>
      <View className="flex-col p-[10px] w-[70%]">
        <Text className="text-[16px]">{client}</Text>
        <TouchableOpacity
          className="bg-[#3f74ff] rounded-[5px] p-[15px] justify-center items-center 
				mt-[15px]"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-[16px] font-semibold text-white">
            Ver Cliente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
