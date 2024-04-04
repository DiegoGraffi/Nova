import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PrecioTalle } from "../lib/api";

type Props = {
  talles: PrecioTalle[];
  selectedSize: string;
  setSelectedSize: (talleId: string) => void;
};

export default function Talles({
  talles,
  selectedSize,
  setSelectedSize,
}: Props) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: "#2a2c2f", fontSize: 16, fontWeight: "300" }}>
        Talles
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {talles.map((talle, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor:
                selectedSize === talle.TALLE ? "#005ce7" : "#d9d9d9",
              padding: 15,
              borderRadius: 10,
              marginRight: 10,
            }}
            onPress={() => setSelectedSize(talle.TALLE)}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                color: selectedSize === talle.TALLE ? "white" : "black",
              }}
            >
              {talle.TALLE}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
