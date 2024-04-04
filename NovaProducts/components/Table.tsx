import { FlatList, Text, View } from "react-native";

type Sucursal = {
  sucursal: string;
  stock: number;
};

type Props = {
  sucursales: Sucursal[];
  total: number;
};

export default function Table({ sucursales, total }: Props) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "300", color: "#2B2B2E" }}>
        Stock
      </Text>
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            overflow: "hidden",
            borderColor: "#d9d9d9",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: "80%",
                padding: 10,
                borderBottomWidth: 1,
                backgroundColor: "white",
                borderRightWidth: 0,
                borderColor: "#d9d9d9",
              }}
            >
              <Text>Depósito</Text>
            </View>
            <View
              style={{
                width: "20%",
                padding: 10,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
                backgroundColor: "white",
                borderColor: "#d9d9d9",
              }}
            >
              <Text style={{ textAlign: "right" }}>Stock</Text>
            </View>
          </View>
          {sucursales.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  width: "80%",
                  padding: 10,
                  borderBottomWidth: 1,
                  backgroundColor: "white",
                  borderRightWidth: 0,
                  borderColor: "#d9d9d9",
                  borderTopWidth: 0,
                }}
              >
                <Text>{item.sucursal}</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  padding: 10,
                  backgroundColor: "white",
                  borderColor: "#d9d9d9",
                  borderTopWidth: 0,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                }}
              >
                <Text style={{ textAlign: "right" }}>{item.stock}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          gap: 15,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "300", color: "#2b2b2e" }}>
          Stock total
        </Text>

        <View
          style={{
            padding: 10,
            backgroundColor: "#005ce7",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 5,
            width: "20%",
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              fontSize: 16,
              color: "white",
              textAlign: "center",
            }}
          >
            {total}
          </Text>
        </View>
      </View>
    </View>
  );
}
