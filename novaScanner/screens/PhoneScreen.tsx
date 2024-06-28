import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useStore } from "../utils/store/clientStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";

export default function PhoneScreen() {
  const { setPrefix, setPhoneNumber, prefix, phoneNumber } = useStore(
    (state) => ({
      setPrefix: state.setPrefix,
      setPhoneNumber: state.setPhoneNumber,
      prefix: state.prefix,
      phoneNumber: state.phoneNumber,
    })
  );
  const navigation = useNavigation();
  const phoneNumberRef = useRef(null);

  const handleSavePhoneNumber = () => {
    navigation.navigate("Carga de Cliente");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phoneNumberRef.current) {
        phoneNumberRef.current.focus();
        Keyboard.isVisible();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-col justify-start items-center p-[15px] border-b-[.5px] bg-white h-full">
      <View className="flex-row items-center w-full mt-[15px] relative">
        <TextInput
          className="w-[20%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full border-[.5px] border-gray-600 rounded-md"
          keyboardType="numeric"
          value={prefix}
          placeholder={prefix}
          onChangeText={(text) => setPrefix(text)}
        />
        <Text className="w-[20%] text-[24px] text-center">15</Text>
        <TextInput
          ref={phoneNumberRef}
          className="w-[60%] p-[10px] bg-[#EFF1F4] pl-[10px] text-[24px] h-full border-[.5px] border-gray-600 rounded-md"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <TouchableOpacity
        className="w-full py-[15px] bg-[#3F75FF] justify-center items-center rounded-md mt-[15px]"
        onPress={handleSavePhoneNumber}
      >
        <Text className="text-[18px] text-white">Guardar telefono</Text>
      </TouchableOpacity>
    </View>
  );
}
