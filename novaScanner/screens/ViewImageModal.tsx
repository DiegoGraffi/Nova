import { Text, View, Modal, TouchableOpacity, Image } from "react-native";

export default function ViewImageModal({ fullImageUri, handleCloseImage }) {
  return (
    <Modal
      visible={fullImageUri !== null}
      animationType="slide"
      transparent={false}
    >
      <View className="flex-1 justify-center items-center p-[15px]">
        <View className="w-full h-[80%] rounded-md overflow-hidden">
          <Image
            source={{ uri: fullImageUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <TouchableOpacity
          className="z-[200] justify-center w-full bg-[#3F75FF] py-[20px] rounded-md mt-[15px]"
          onPress={handleCloseImage}
        >
          <Text className="text-[18px] text-[#EFF1F4] text-center">Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
