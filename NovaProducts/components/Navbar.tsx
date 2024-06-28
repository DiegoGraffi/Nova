import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Search, X, ScanBarcode } from "lucide-react-native";

export default function Navbar({
  setCode,
  toggleCamera,
  inputValue,
  setInputValue,
  handleDelete,
  inputRef,
}) {
  const handleSearch = () => {
    setCode(inputValue);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#2a2c2f",
      }}
    >
      <View
        style={{
          zIndex: 100,
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
            ref={inputRef}
            placeholder="Ingresar código"
            inputMode="numeric"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            maxLength={13}
            returnKeyType="search"
            keyboardType="numeric"
            onSubmitEditing={handleSearch}
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
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 15,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            padding: 10,
            gap: 10,
          }}
          onPress={toggleCamera}
        >
          <ScanBarcode color={"#2a2c2f"} />
          <Text style={{ fontSize: 18, color: "#2a2c2f" }}>
            Escanear codigo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
