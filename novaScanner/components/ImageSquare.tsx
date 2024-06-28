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
    <View className="justify-center items-center overflow-hidden h-[250px] flex-1 mr-[30px] bg-[#EFF1F4] relative object-contain rounded-md">
      {capturedImages[item.name] ? (
        <Image
          source={{ uri: capturedImages[item.name] }}
          className="h-[100%] object-contain rounded-[5px] w-[50%]"
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
            className="rounded-full px-5 py-3 bg-[#C9DAF4]"
          >
            <Camera color={"#3F75FF"} strokeWidth={1.5} size={30} />
          </TouchableOpacity>
        </View>
      )}
      {capturedImages[item.name] && (
        <Text className="absolute z-50 bg-[#3F75FF] text-[#EFF1F4] p-2 top-[10px] left-[10px] rounded-[5px]">
          {item.name}
        </Text>
      )}
      {capturedImages[item.name] && (
        <View className="flex-row w-[100%] justify-between items-center bottom-[10px] absolute px-[10px]">
          <TouchableOpacity
            onPress={() => handleOpenImage(capturedImages[item.name])}
            className="px-[10px] rounded-[5px] bg-white h-[100%] items-center justify-center"
          >
            <Text className="text-[#3F75FF]">Ver imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-2 rounded-[5px]"
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
