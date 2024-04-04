import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { Search, X } from "lucide-react-native";
import { useState } from "react";

export default function Navbar({ setCode }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setCode(inputValue);
  };

  const handleDelete = () => {
    setInputValue("");
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
          width: "20%",
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
            fontSize: 18,
          }}
          placeholder="Ingresar código"
          inputMode="numeric"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          maxLength={13}
        />
      </View>
      <View
        style={{
          paddingRight: 15,
          flexDirection: "row",
          justifyContent: "space-around",
          width: "20%",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={handleDelete}>
          <X color={"white"} size={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearch}>
          <Search color={"white"} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
