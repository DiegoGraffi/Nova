import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function PhoneScreen() {
  return (
    <View className="flex-col justify-start items-center p-[15px] border-b-[.5px] bg-white h-full">
      <View className="flex-row items-center w-full mt-[15px] relative">
        <TextInput
          className="w-[20%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full  rounded-[5px]"
          keyboardType="numeric"
          // onChangeText={(text) => setPrefix(text)}
        />
        <Text className="w-[20%] text-[24px] text-center">15</Text>
        <TextInput
          className="w-[60%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full rounded-[5px]"
          keyboardType="numeric"
          // onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      <View className="w-full mt-[30px]">
        <TouchableOpacity className="w-full py-[15px] rounded-[5px] bg-[#3F75FF] justify-center items-center">
          <Text className="text-[18px] text-white">Guardar telefono</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
