import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useStore } from "../utils/store/clientStore";

export default function PhoneScreen() {
  const { setPrefix, setPhoneNumber } = useStore();
  return (
    <View className="flex-col justify-start items-center p-[15px] border-b-[.5px] bg-white h-full">
      <View className="flex-row items-center w-full mt-[15px] relative">
        <TextInput
          className="w-[20%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full border-[.5px] border-gray-600"
          keyboardType="numeric"
          onChangeText={(text) => setPrefix(text)}
        />
        <Text className="w-[20%] text-[24px] text-center">15</Text>
        <TextInput
          className="w-[60%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full border-[.5px] border-gray-600"
          keyboardType="numeric"
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      <View className="w-full mt-[15px]">
        <TouchableOpacity className="w-full py-[15px] bg-[#3F75FF] justify-center items-center">
          <Text className="text-[18px] text-white">Guardar telefono</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
