import { CameraView } from "expo-camera/next";
import { RefreshCw, X } from "lucide-react-native";
import { Modal, TouchableOpacity, View } from "react-native";
import BarcodeMask from "react-native-barcode-mask";

export default function CameraScannerView({
  facing,
  handleBarCodeScanned,
  scanned,
  toggleCameraFacing,
  __takePicture,
  toggleCamera,
  cameraMode,
}) {
  return (
    <Modal style={{ flex: 1 }}>
      {cameraMode === "scanner" ? (
        <CameraView
          ref={(ref) => (cameraRef = ref)}
          facing={facing}
          style={{ flex: 1, justifyContent: "flex-end" }}
          barcodeScannerSettings={{
            barcodeTypes: ["pdf417"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <BarcodeMask
            width={300}
            height={100}
            animatedLineColor="#3f74ff"
            outerMaskOpacity={0.8}
          />
          <View className="absolute bottom-0 flex-row flex-1 w-[100%] p-[20px] justify-between">
            <View className="flex-1 flex-row items-center justify-evenly self-center">
              <TouchableOpacity
                onPress={toggleCameraFacing}
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RefreshCw color={"white"} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleCamera}
                className="h-[35px] w-[35px] justify-center items-center"
              >
                <X color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      ) : (
        <CameraView
          ref={(ref) => (cameraRef = ref)}
          facing={facing}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View className="absolute bottom-0 flex-row flex-1 w-[100%] p-[20px] justify-between">
            <View className="flex-1 flex-row items-center justify-evenly self-center">
              <TouchableOpacity
                onPress={toggleCameraFacing}
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RefreshCw color={"white"} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={__takePicture}
                className="w-[70px] h-[70px] bottom-0 rounded-[50px] bg-white border-[6px] border-[#cccccc]"
              />

              <TouchableOpacity
                onPress={toggleCamera}
                className="h-[35px] w-[35px] justify-center items-center"
              >
                <X color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      )}
    </Modal>
  );
}
