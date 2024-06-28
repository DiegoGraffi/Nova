import { Camera, Eye, RefreshCw } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePicture({
  items,
  capturedImages,
  setCurrentItem,
  setShowCamera,
  handleOpenImage,
  handleCameraMode,
}) {
  const item = items[0];
  return (
    <View className="justify-center items-center h-[150px] w-[150px] rounded-full my-[50px] mx-auto">
      {capturedImages[item.name] ? (
        <Image
          source={{ uri: capturedImages[item.name] }}
          className="w-[100%] h-[100%] rounded-full"
        />
      ) : (
        <View className="flex-col justify-center items-center w-full h-full space-y-3 bg-[#EFF1F4] rounded-full">
          <Text className="text-[16px] text-[#3F75FF] font-light">
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentItem(item.name);
              setShowCamera(true);
              handleCameraMode("camera");
            }}
            className="rounded-full px-5 py-3 bg-[#C9DAF4]"
          >
            <Camera color={"#3F75FF"} strokeWidth={1.5} size={30} />
          </TouchableOpacity>
        </View>
      )}
      {capturedImages[item.name] && (
        <Text className="absolute z-50 bg-[#3F75FF] text-[#EFF1F4] px-[8px] py-[5px] rounded-[2px] -top-[10px] text-[16px]">
          {item.name}
        </Text>
      )}
      {capturedImages[item.name] && (
        <View className="flex-row w-[100%] justify-center items-center p-[4px] -bottom-[10px] absolute">
          <TouchableOpacity
            onPress={() => handleOpenImage(capturedImages[item.name])}
            className="px-[20px] py-[8px] rounded-l-full bg-[#3F75FF] items-center justify-center"
          >
            <Eye color="#EFF1F4" strokeWidth={1.5} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            className="px-[20px] py-[8px] rounded-r-full bg-[#3F75FF] items-center justify-center border-l border-l-[#EFF1F4]"
            onPress={() => {
              setCurrentItem(item.name);
              setShowCamera(true);
            }}
          >
            <RefreshCw color="#EFF1F4" strokeWidth={1.5} size={24} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
