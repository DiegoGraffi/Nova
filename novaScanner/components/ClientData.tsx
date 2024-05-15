import { ScanBarcode } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import DataItem from "./DataItem";

export default function ClientData({
  scannedData,
  handleData,
  toggleCamera,
  handleCameraMode,
}) {
  return (
    <View className="w-full">
      <View className="flex-col items-center w-full">
        {scannedData ? (
          <View className="mb-[25px] w-full">
            <TouchableOpacity
              className="flex flex-row items-center border-[.3px] border-[#3F75FF] justify-center py-[15px] rounded-[5px] w-full"
              onPress={() => {
                toggleCamera();
                handleCameraMode("scanner");
              }}
            >
              <ScanBarcode color={"#3F75FF"} />
              <Text className="text-[18px] font-light text-[#3F75FF]">
                Escanear nuevamente
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="py-[15px] rounded-[5px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF] "
            onPress={() => {
              toggleCamera();
              handleCameraMode("scanner");
            }}
          >
            <ScanBarcode color={"#EFF1F4"} />
            <Text className="text-white text-[18px] font-light">
              Escanear código
            </Text>
          </TouchableOpacity>
        )}

        {scannedData && (
          <View className="my-[10px] w-full space-y-[10px] bg-[#eff1f4] rounded-[5px] p-[10px]">
            <Text className="text-[#3f74ff]">Datos obtenidos</Text>
            <Text className="text-[18px]">{scannedData}</Text>
          </View>
        )}
      </View>
    </View>
  );
}