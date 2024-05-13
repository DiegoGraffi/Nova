import { Image, Text, View } from "react-native";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  return (
    <View className="px-[15px] py-[10px] flex-row justify-between items-center border-b-[.5px] border-b-[#3F75FF]">
      <View className="w-[52px] h-[30px] object-contain">
        <Image source={Logo} className="absolute object-contain" />
      </View>
      <View className="flex-row gap-[10px] items-center">
        <Text>Nombre empresa</Text>
        <View className="w-[40px] h-[40px] overflow-hidden rounded-full border-[.3px]"></View>
      </View>
    </View>
  );
}
