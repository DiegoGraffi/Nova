import { Text, View, Modal, TouchableOpacity, Image } from "react-native";

export default function ViewImageModal({ fullImageUri, handleCloseImage }) {
  return (
    <Modal
      visible={fullImageUri !== null}
      animationType="slide"
      transparent={false}
    >
      <View className="flex-1 justify-center items-center p-[15px]">
        <Image
          source={{ uri: fullImageUri }}
          className="w-[400px] h-[300px] rounded-[10px] overflow-hidden"
          resizeMode="cover"
        />

        <TouchableOpacity
          className="absolute bottom-[20px] z-[200] justify-center w-full bg-[#3F75FF] py-[20px] rounded-[5px]"
          onPress={handleCloseImage}
        >
          <Text className="text-[18px] text-[#EFF1F4] text-center">Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
