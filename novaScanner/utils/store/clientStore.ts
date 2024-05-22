import { create } from "zustand";
import { PermissionResponse, useCameraPermissions } from "expo-camera/next";

interface StoreState {
  facing: "front" | "back";
  setFacing: (newFacing: "front" | "back") => void;

  permission: PermissionResponse;
  setPermission: (newPermission: PermissionResponse) => void;

  scanned: boolean;
  setScanned: (newScanned: boolean) => void;

  scannedData: string;
  setScannedData: (newScannedData: string) => void;

  currentItem: string;
  setCurrentItem: (newCurrentItem: string) => void;

  prefix: string;
  setPrefix: (newPrefix: string) => void;

  phoneNumber: string;
  setPhoneNumber: (newPhoneNumber: string) => void;

  fullImageUri: null | string;
  setFullImageUri: (newFullImageUri: null | string) => void;

  cameraMode: string;
  setCameraMode: (newCameraMode: string) => void;

  showCamera: boolean;
  setShowCamera: (newShowCamera: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  facing: "back",
  setFacing: (newFacing) => set({ facing: newFacing }),
  permission: null,
  setPermission: (newPermission) => set({ permission: newPermission }),
  scanned: false,
  setScanned: (newScanned) => set({ scanned: newScanned }),
  scannedData: "",
  setScannedData: (newScannedData) => set({ scannedData: newScannedData }),

  currentItem: "",
  setCurrentItem: (newCurrentItem) => set({ currentItem: newCurrentItem }),
  prefix: "",
  setPrefix: (newPrefix) => set({ prefix: newPrefix }),
  phoneNumber: "",
  setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
  fullImageUri: null,
  setFullImageUri: (newFullImageUri) => set({ fullImageUri: newFullImageUri }),
  cameraMode: "",
  setCameraMode: (newCameraMode) => set({ cameraMode: newCameraMode }),
  showCamera: false,
  setShowCamera: (newShowCamera) => set({ showCamera: newShowCamera }),
}));
