import { Phone } from "lucide-react-native";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../utils/store/clientStore";

export default function PhoneInput() {
  const navigation = useNavigation();
  const { prefix, phoneNumber } = useStore();

  const displayNumber =
    prefix && phoneNumber ? `+${prefix} 15 ${phoneNumber}` : null;
  const buttonText = displayNumber ? "Editar telefono" : "Ingresar telefono";

  return (
    <View className="flex-col justify-between items-center py-[15px] border-b-[.5px] border-b-[#3F75FF]">
      {displayNumber && (
        <View className="w-full space-y-[10px] bg-[#eff1f4] p-[10px] border-[.5px] border-gray-600">
          <Text className="text-[#3f74ff]">Telefono</Text>
          <Text className="text-[18px] text-gray-600">{displayNumber}</Text>
        </View>
      )}
      <View className="flex-row items-center w-full relative">
        <TouchableOpacity
          onPress={() => navigation.navigate("Telefono")}
          className={`py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF] ${
            displayNumber
              ? "mt-[15px] bg-white border-[.5px] border-gray-600"
              : "mt-[0px]"
          }`}
        >
          <Phone
            size={20}
            color={displayNumber ? "#3f74ff" : "#ffffff"}
            strokeWidth={1.5}
          />
          <Text
            className={`text-[18px] ${
              displayNumber ? "text-[#3f74ff]" : "text-white"
            }`}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
