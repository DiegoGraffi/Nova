import { ScrollView, Text, View } from "react-native";
import ImageSquare from "./ImageSquare";

export default function ImagesContainer({
  items,
  capturedImages,
  setCurrentItem,
  setShowCamera,
  handleOpenImage,
  handleCameraMode,
}) {
  const fotos = items.slice(1);
  return (
    <View className="flex-col py-[15px]">
      <Text>Fotos</Text>
      <ScrollView horizontal className="mt-[15px]">
        {fotos.map((item) => (
          <ImageSquare
            key={item.name}
            item={item}
            capturedImages={capturedImages}
            setCurrentItem={setCurrentItem}
            setShowCamera={setShowCamera}
            handleOpenImage={handleOpenImage}
            handleCameraMode={handleCameraMode}
          />
        ))}
      </ScrollView>
    </View>
  );
}
