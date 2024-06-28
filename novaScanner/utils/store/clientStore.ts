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

  date: string;
  setDate: (newCurrentItem: string) => void;

  formValid: boolean;
  setFormValid: (newFormValid: boolean) => void;

  currentIndex: number;
  setCurrentIndex: (newCurrentIndex: number) => void;

  lastIndex: number;
  setLastIndex: (newLastIndex: number) => void;

  capturedImages: Record<string, string>;
  setCapturedImages: (capturedImages: Record<string, string>) => void;
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
  prefix: "264",
  setPrefix: (newPrefix) => set({ prefix: newPrefix }),
  phoneNumber: "",
  setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
  fullImageUri: null,
  setFullImageUri: (newFullImageUri) => set({ fullImageUri: newFullImageUri }),
  cameraMode: "",
  setCameraMode: (newCameraMode) => set({ cameraMode: newCameraMode }),
  showCamera: false,
  setShowCamera: (newShowCamera) => set({ showCamera: newShowCamera }),
  date: "",
  setDate: (newDate) => set({ date: newDate }),
  formValid: false,
  setFormValid: (newFormValid) => set({ formValid: newFormValid }),
  currentIndex: 0,
  setCurrentIndex: (newCurrentIndex) => set({ currentIndex: newCurrentIndex }),
  lastIndex: 0,
  setLastIndex: (newLastIndex) => set({ lastIndex: newLastIndex }),
  capturedImages: {},
  setCapturedImages: (capturedImages) => set({ capturedImages }),
}));
