import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GeneralData from "../components/GeneralData";
import AditionalData from "../components/AditionalData";
import Talles from "../components/Talles";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useState, Suspense } from "react";
import { fetchProductByCode } from "../lib/api";
import ProductInfo from "../components/ProductInfo";

export default function Home() {
  const [code, setCode] = useState("");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{}}>
      <Navbar setCode={setCode} />
      {code !== "" ? (
        <Suspense
          fallback={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 200,
              }}
            >
              <Text>Cargando</Text>
            </View>
          }
        >
          <ProductFinder code={code} />
        </Suspense>
      ) : (
        <Welcome />
      )}
    </ScrollView>
  );
}

function Welcome() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginTop: 100,
      }}
    >
      <Image
        source={require("../assets/images/search.png")}
        style={{ objectFit: "contain", width: 150, height: 150 }}
      />
      <View style={{ paddingHorizontal: 30 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#005CE7",
            textAlign: "center",
          }}
        >
          Bienvenido
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "300",
            color: "#005CE7",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          Ingrese un código en la barra de búsqueda para comenzar
        </Text>
      </View>
    </View>
  );
}

type ProductFinderProps = {
  code: string;
};
function ProductFinder(props: ProductFinderProps) {
  const { code } = props;

  const { data } = useSuspenseQuery({
    queryKey: ["dataProducto", code],
    queryFn: async () => {
      return await fetchProductByCode(code);
    },
  });

  if (!data.data) {
    return <ProductNotFound />;
  }
  console.log(data);
  return <ProductInfo data={data.data} />;
}

function ProductNotFound() {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginTop: 100,
      }}
    >
      <Image
        source={require("../assets/images/noResults.png")}
        style={{ objectFit: "contain", width: 150, height: 150 }}
      />
      <View style={{ paddingHorizontal: 30 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#005CE7",
            textAlign: "center",
          }}
        >
          Advertencia
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "300",
            color: "#005CE7",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          El código de producto no coincide con un producto en existencia
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ececec",
  },
});
