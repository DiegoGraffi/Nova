import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ItemTableroMonth({ title, span, icon, before, after }) {
  const navigation = useNavigation();

  const percentageChange = ((after - before) / before) * 100;
  const isZeroPercentage = percentageChange === 0;

  const isIncrease = after > before;

  const beforeColor = before > after ? "#2BD24C" : "#FF4141";
  const afterColor = after > before ? "#2BD24C" : "#FF4141";

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail")}
      style={styles.itemContainer}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title} <Text style={styles.span}>{span}</Text>
        </Text>
        <Ionicons name={icon} size={24} color="#fff" style={styles.icon} />
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.data}>
          {isZeroPercentage ? null : isIncrease ? (
            <Ionicons name="arrow-up-circle" size={26} color={"#2BD24C"} />
          ) : (
            <Ionicons name="arrow-down-circle" size={26} color={"#FF4141"} />
          )}
          <Text style={styles.number}>{percentageChange.toFixed(2)}</Text>
          <Text style={styles.percentage}>%</Text>
        </View>
        <View style={styles.comparationData}>
          <View style={styles.dataBefore}>
            <Text style={styles.comparationTitle}>Mes ant.:</Text>
            <Text
              style={[
                styles.comparationNumber,
                { borderBottomColor: beforeColor },
              ]}
            >
              {before}
            </Text>
          </View>
          <View style={styles.dataAfter}>
            <Text style={styles.comparationTitle}>Este mes:</Text>
            <Text
              style={[
                styles.comparationNumber,
                { borderBottomColor: afterColor },
              ]}
            >
              {after}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "48%",
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#005ce7",
    padding: 5,
    borderRadius: 5,
  },
  title: {
    width: "70%",
    fontFamily: "MontserratMedium",
    color: "#fff",
  },
  span: {
    fontFamily: "MontserratBold",
  },
  icon: {
    marginLeft: 10,
  },
  dataContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  number: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "MontserratBold",
  },
  percentage: {
    opacity: 0.5,
    fontFamily: "MontserratBold",
    fontSize: 24,
    padding: 3,
  },
  comparationData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: 10,
  },
  dataBefore: {
    flex: 1,
    padding: 5,
    borderRightWidth: 0.2,
    borderRightColor: "#00000060",
  },
  dataAfter: {
    flex: 1,
    padding: 5,
  },
  comparationTitle: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
    fontFamily: "MontserratMedium",
  },
  comparationNumber: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "MontserratMedium",
    paddingBottom: 8,
    marginTop: 10,
    padding: 3,
    borderBottomWidth: 3,
  },
});
