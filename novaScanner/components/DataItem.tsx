import { Text, View } from "react-native";

export default function DataItem({ data, title }) {
  return (
    <View className="w-[50%] mb-[15px]">
      <Text className="font-light text-[14px] text-[#3F75FF] mb-[5px]">
        {title}
      </Text>
      <Text className="font-semibold text-[20px] text-[#181E35]">{data}</Text>
    </View>
  );
}
