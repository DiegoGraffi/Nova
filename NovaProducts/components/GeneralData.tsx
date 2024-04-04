import { Text, View } from "react-native";

type Props = {
  name: string;
  brand: string;
  price: string;
  codigo: string;
};

export default function GeneralData({ name, brand, price, codigo }: Props) {
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
          gap: 5,
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
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
              fontWeight: "300",
              fontSize: 18,
              color: "white",
            }}
          >
            {codigo}
          </Text>
        </View>
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
          gap: 5,
          width: "40%",
        }}
      >
        <Text
          style={{
            fontWeight: "300",
            fontSize: 16,
            color: "white",
          }}
        >
          Marca
        </Text>
        <Text
          style={{
            textTransform: "uppercase",
            color: "white",
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          {brand}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          gap: 5,
          backgroundColor: "#ececec",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "300",
            fontSize: 16,
            color: "black",
          }}
        >
          Precio
        </Text>
        <Text
          style={{
            textTransform: "uppercase",
            color: "black",
            fontWeight: "bold",
            fontSize: 46,
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
