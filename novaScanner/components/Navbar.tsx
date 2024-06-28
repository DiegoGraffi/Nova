import { Image, Text, View } from "react-native";
import Logo from "../assets/Logo.png";
import LogoCA from "../assets/logo Calzados Alberto.png";

export default function Navbar() {
  return (
    <View className="px-[15px] py-[10px] flex-row justify-between items-center border-b-[.5px] border-b-[#3F75FF]">
      <View className="w-[52px] h-[30px] object-contain">
        <Image source={Logo} className="absolute object-contain" />
      </View>
      <View className="flex-row gap-[10px] items-center">
        <Text>Calzados Alberto</Text>

        <Image
          source={LogoCA}
          className="object-contain z-50 w-[40px] h-[40px] rounded-full"
        />
      </View>
    </View>
  );
}
