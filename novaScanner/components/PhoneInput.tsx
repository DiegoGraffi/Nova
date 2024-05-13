import { Phone } from "lucide-react-native";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PhoneInput({ setPrefix, setPhoneNumber }) {
  const navigation = useNavigation();

  return (
    <View className="flex-col justify-between items-center py-[15px] border-b-[.5px] border-b-[#3F75FF]">
      <View className="flex-row justify-between w-full">
        <Text>Telefono</Text>
      </View>
      <View className="flex-row items-center w-full mt-[15px] relative">
        <TouchableOpacity
          onPress={() => navigation.navigate("Telefono")}
          className="py-[15px] rounded-[5px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF] "
        >
          <Phone size={20} color="#fff" />
          <Text className="text-[18px] text-white">Ingresar telefono</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
