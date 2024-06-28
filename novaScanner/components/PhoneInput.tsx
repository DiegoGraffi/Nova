import { Phone } from "lucide-react-native";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../utils/store/clientStore";

export default function PhoneInput() {
  const navigation = useNavigation();
  const { prefix, phoneNumber } = useStore((state) => ({
    prefix: state.prefix,
    phoneNumber: state.phoneNumber,
  }));

  const displayNumber =
    prefix && phoneNumber ? `+${prefix} 15 ${phoneNumber}` : null;
  const buttonText = displayNumber ? "Editar telefono" : "Ingresar telefono";

  return (
    <View className="flex-col justify-between items-center py-[15px] border-b-[.5px] border-b-[#3F75FF]">
      {displayNumber && (
        <View className="w-full space-y-[10px] bg-[#eff1f4] p-[10px] border-[.5px] border-gray-600 rounded-t-md border-b-0">
          <Text className="text-[#3f74ff]">Telefono</Text>
          <Text className="text-[18px] text-gray-600">{displayNumber}</Text>
        </View>
      )}
      <View className="flex-row items-center w-full relative">
        <TouchableOpacity
          onPress={() => navigation.navigate("Telefono")}
          className={`py-[15px] w-full flex-row space-x-[10px] justify-center items-center rounded-md bg-white border-[.5px] border-gray-600 mt-[0px] ${
            displayNumber && "rounded-t-none"
          }`}
        >
          <Phone size={20} color={"#3f74ff"} strokeWidth={1.5} />
          <Text
            className="text-[18px] 
              text-[#3f74ff]"
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
