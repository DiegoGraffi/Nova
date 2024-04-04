import { Text, View } from "react-native";

type Props = {
  name: string;
  brand: string;
  price: string;
};

export default function GeneralData({ name, brand, price }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#005ce7",
        padding: 15,
        borderRadius: 10,
        gap: 25,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "300",
            fontSize: 16,
            color: "white",
          }}
        >
          Nombre
        </Text>
        <Text
          style={{
            textTransform: "uppercase",
            color: "white",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          {name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            color: "white",
            fontWeight: "bold",
            fontSize: 40,
          }}
        >
          {formatPrice(price)}
        </Text>
      </View>
    </View>
  );
}

function formatPrice(price: string) {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return formatter.format(parseFloat(price));
}
