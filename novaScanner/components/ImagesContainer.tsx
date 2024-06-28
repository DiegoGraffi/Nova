import { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ImageSquare from "./ImageSquare";
import { ChevronRight, ChevronLeft } from "lucide-react-native";
import { FlatList } from "react-native";
import { useStore } from "../utils/store/clientStore";

const { width } = Dimensions.get("window");

export default function ImagesContainer({
  items,
  capturedImages,
  setCurrentItem,
  setShowCamera,
  handleOpenImage,
  handleCameraMode,
}) {
  const fotos = items.slice(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item, index }) => (
    <View
      style={{
        width: width - 60,
        marginRight: index === fotos.length - 1 ? 30 : 0,
      }}
    >
      <ImageSquare
        key={item.name}
        item={item}
        capturedImages={capturedImages}
        setCurrentItem={setCurrentItem}
        setShowCamera={setShowCamera}
        handleOpenImage={handleOpenImage}
        handleCameraMode={handleCameraMode}
      />
    </View>
  );

  const handleNext = () => {
    if (currentIndex < fotos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <View className="flex-row py-[15px] relative items-center">
      {currentIndex > 0 && (
        <TouchableOpacity
          onPress={handlePrevious}
          className="absolute left-0 p-2 z-50 rounded-full bg-[#3F75FF] "
        >
          <ChevronLeft color={"white"} size={30} strokeWidth={1.5} />
        </TouchableOpacity>
      )}
      <FlatList
        ref={flatListRef}
        data={fotos}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment="start"
        scrollEnabled={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ marginHorizontal: 30 }}
        className="border-0 h-[250px]"
      />
      {currentIndex < fotos.length - 1 ? (
        <TouchableOpacity
          onPress={handleNext}
          className="absolute right-0 p-2 rounded-full bg-[#3F75FF]"
        >
          <ChevronRight color={"white"} size={30} strokeWidth={1.5} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
