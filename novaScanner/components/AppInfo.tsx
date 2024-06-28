import { useState, useEffect } from "react";
import { Text, View } from "react-native";

export default function AppInfo() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const currentDateTime = new Date();
      const formattedDateTime =
        currentDateTime.toLocaleDateString() +
        " " +
        currentDateTime.toLocaleTimeString("en-US", {
          hour12: false,
          timeZoneName: undefined,
        });
      setCurrentDateTime(formattedDateTime);
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); // actualiza cada 1 segundo
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View className="flex-row justify-center items-center flex-1">
      <View className="w-full">
        <Text className="font-bold text-[16px]">Carga de Cliente</Text>
        <Text>{currentDateTime}</Text>
      </View>
    </View>
  );
}
