import { StyleSheet, View } from "react-native";
import { ProductData } from "../lib/api";
import GeneralData from "./GeneralData";
import AditionalData from "./AditionalData";
import Talles from "./Talles";
import Table from "./Table";
import { useState } from "react";

type Props = {
  data: ProductData;
  code: string;
};

export default function ProductInfo({ data, code }: Props) {
  const talles = data.precio;
  const primerPrecio = talles[0];
  const [selectedSize, setSelectedSize] = useState(primerPrecio.TALLE);
  const precioSeleccionado = talles.find((item) => item.TALLE === selectedSize);

  const articulo = data.articulo;
  const sucursales = data.stock
    .filter((item) => item.TALLE === selectedSize)
    .map((item) => ({
      sucursal: item.NDEPOSITO,
      stock: parseInt(item.STOCK),
    }));

  const stockTotal = data.stock

    .filter((item) => item.TALLE === selectedSize)
    .reduce((total, item) => parseInt(item.STOCK) + total, 0);

  return (
    <>
      <View style={styles.background}></View>
      <View style={styles.dataContainer}>
        <GeneralData
          name={articulo.NOMBRE}
          brand={articulo.NMARCA}
          price={precioSeleccionado.PREC1}
          codigo={code}
        />
        {data.articulo.TIPOTALLE === "02" && (
          <Talles
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            talles={talles}
          />
        )}
        <Table sucursales={sucursales} total={stockTotal} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#2a2c2f",
  },
  dataContainer: {
    backgroundColor: "#ececec",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "100%",
    gap: 15,
  },
});
