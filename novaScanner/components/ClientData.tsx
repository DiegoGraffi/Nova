import { ScanBarcode } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import DataItem from "./DataItem";

export default function ClientData({
  scannedData,
  toggleCamera,
  handleCameraMode,
}) {
  return (
    <View className="w-full">
      <View className="flex-col items-center w-full">
        {scannedData ? (
          <View className="w-full">
            <TouchableOpacity
              className={`flex flex-row items-center border-[.5px] border-gray-600 justify-center py-[15px] w-full space-x-[5px] rounded-md ${
                scannedData && "border-b-0 rounded-b-none"
              }`}
              onPress={() => {
                toggleCamera();
                handleCameraMode("scanner");
              }}
            >
              <ScanBarcode color={"#3F75FF"} strokeWidth={1.5} />
              <Text className="text-[18px] font-light text-[#3F75FF]">
                Escanear nuevamente
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-white border-[.5px] border-gray-600 rounded-md"
            onPress={() => {
              toggleCamera();
              handleCameraMode("scanner");
            }}
          >
            <ScanBarcode color={"#3F75FF"} strokeWidth={1.5} />
            <Text className="text-[#3F75FF] text-[18px] font-light">
              Escanear código
            </Text>
          </TouchableOpacity>
        )}

        {scannedData && (
          <View className="w-full space-y-[10px] bg-[#eff1f4] p-[10px] border-[.5px] border-gray-600 rounded-b-md">
            <Text className="text-[#3f74ff]">Datos obtenidos</Text>
            <Text className="text-[18px] text-gray-600">{scannedData}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
