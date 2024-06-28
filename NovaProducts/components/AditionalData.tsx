import { Text, View } from "react-native";

export default function AditionalData({ data }) {
  return (
    <View
      style={{
        backgroundColor: "#d9d9d9",
        width: "100%",
        borderRadius: 10,
        padding: 10,
        gap: 15,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "300", color: "#2a2c2f" }}>
        Marca
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          color: "#2a2c2f",
          textTransform: "uppercase",
        }}
      >
        {data.data.articulo.NMARCA}
      </Text>
    </View>
  );
}
