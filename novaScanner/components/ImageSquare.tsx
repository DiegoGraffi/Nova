import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera, RefreshCw } from "lucide-react-native";

export default function ImageSquare({
  item,
  capturedImages,
  setCurrentItem,
  setShowCamera,
  handleOpenImage,
  handleCameraMode,
}) {
  return (
    <View className="justify-center items-center overflow-hidden h-[250px] w-[150px] mr-[15px] bg-[#EFF1F4]">
      {capturedImages[item.name] ? (
        <Image
          source={{ uri: capturedImages[item.name] }}
          className="w-[100%] h-[100%] aspect-[4/3] rounded-[5px]"
        />
      ) : (
        <View className="flex-col justify-center items-center gap-[10px]">
          <Text className="text-[16px] text-[#3F75FF] font-light">
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentItem(item.name);
              setShowCamera(true);
              handleCameraMode("camera");
            }}
          >
            <Camera color={"#3F75FF"} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      )}
      {capturedImages[item.name] && (
        <Text className="absolute z-50 bg-[#3F75FF] text-[#EFF1F4] p-[4px] top-[5px] left-[5px] rounded-[2px]">
          {item.name}
        </Text>
      )}
      {capturedImages[item.name] && (
        <View className="flex-row w-[100%] justify-between items-center p-[4px] bottom-[2px] absolute">
          <TouchableOpacity
            onPress={() => handleOpenImage(capturedImages[item.name])}
            className="px-[10px] rounded-[5px] bg-[#3F75FF] h-[100%] items-center justify-center"
          >
            <Text className="text-[#EFF1F4]">Ver imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-[3px] rounded-[5px]"
            onPress={() => {
              setCurrentItem(item.name);
              setShowCamera(true);
            }}
          >
            <RefreshCw color="#3F75FF" strokeWidth={1.5} size={24} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
