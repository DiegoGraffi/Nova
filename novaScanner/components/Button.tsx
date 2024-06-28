import { Text, TouchableOpacity } from "react-native";

export default function Button({ text }) {
  return (
    <TouchableOpacity className="w-full py-[15px] rounded-[5px] bg-[#3F75FF] justify-center items-center">
      <Text className="text-[18px] text-white">{text}</Text>
    </TouchableOpacity>
  );
}
