import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { Search } from "lucide-react-native";
import { useState } from "react";

export default function Navbar({ setCode }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setCode(inputValue);
  };

  return (
    <View
      style={{
        zIndex: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#2a2c2f",
      }}
    >
      <View
        style={{
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/LogoNova.png")}
          style={{ objectFit: "contain", width: 50, height: 30 }}
        />
      </View>
      <View style={{ padding: 15, width: "60%" }}>
        <TextInput
          style={{
            backgroundColor: "white",
            paddingVertical: 10,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Ingresar código"
          inputMode="numeric"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          maxLength={13}
        />
      </View>
      <TouchableOpacity style={{ paddingRight: 15 }} onPress={handleSearch}>
        <Search color={"white"} />
      </TouchableOpacity>
    </View>
  );
}
