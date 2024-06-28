import { useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function Chart({ title, span }) {
  const ref = useRef(null);

  const lineData = [
    { value: 20.4, label: "Enero" },
    { value: 8.1, label: "Febrero" },
    { value: 15.6, label: "Marzo" },
    { value: 10.1, label: "Abril" },
    { value: 46.4, label: "Mayo" },
    { value: 23.1, label: "Junio" },
    { value: 35.0, label: "Julio" },
    { value: 48.2, label: "Agosto" },
    { value: 41.9, label: "Septiembre" },
    { value: 15.7, label: "Octubre" },
    { value: 31.8, label: "Noviembre" },
    { value: 20.1, label: "Diciembre" },
  ];

  const lineData2 = [
    { value: 11.6, label: "Enero" },
    { value: 10.9, label: "Febrero" },
    { value: 34.6, label: "Marzo" },
    { value: 28.5, label: "Abril" },
    { value: 30.0, label: "Mayo" },
    { value: 13.5, label: "Junio" },
    { value: 28.7, label: "Julio" },
    { value: 16.2, label: "Agosto" },
    { value: 20.4, label: "Septiembre" },
    { value: 31.6, label: "Octubre" },
    { value: 29.5, label: "Noviembre" },
    { value: 37.9, label: "Diciembre" },
  ];

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const showOrHidePointer = (index) => {
    const xOffset = index * 100;
    ref.current?.scrollTo({ x: xOffset });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <View>
        <Text style={styles.chartTitle}>
          {title}
          <Text style={styles.span}>{span}</Text>
        </Text>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          style={{ flexDirection: "row", paddingVertical: 10 }}
        >
          {months.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 15,
                  margin: 4,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                }}
                onPress={() => showOrHidePointer(index)}
              >
                <Text
                  style={{
                    color: "#000000",
                  }}
                >
                  {months[index]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.chartContainer}>
          <LineChart
            scrollRef={ref}
            data={lineData}
            data2={lineData2}
            startFillColor2={"rgb(0, 92, 231)"}
            endFillColor2={"rgb(0, 92, 231)"}
            curved
            thickness={1}
            initialSpacing={20}
            xAxisLabelsVerticalShift={15}
            startFillColor={"rgb(185, 185, 198)"}
            endFillColor={"rgb(185, 185, 198)"}
            startOpacity={1}
            endOpacity={0.1}
            rulesColor="#00000030"
            rulesType="dashed"
            spacing={100}
            areaChart
            color="#b9b9c6"
            color2="#005ce7"
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            yAxisLabelSuffix=" M"
            showValuesAsDataPointsText
            showVerticalLines
            dataPointLabelShiftX={10}
            isAnimated
            animateOnDataChange
            onDataChangeAnimationDuration={300}
            textFontSize={14}
            focusEnabled={true}
            showDataPointOnFocus
            showTextOnFocus
            delayBeforeUnFocus={3000}
            textShiftY={5}
            textShiftX={10}
            textColor1="#000"
            textColor2="#000"
            showStripOnFocus
          />
          <View style={styles.dataContainer}>
            <View style={styles.dataReferenceContainer}>
              <Text style={styles.dataReferenceTitle}>Año anterior:</Text>
              <View
                style={[
                  styles.dataReferenceColor,
                  { backgroundColor: "#b9b9c6" },
                ]}
              ></View>
            </View>

            <View style={styles.dataReferenceContainer}>
              <Text style={styles.dataReferenceTitle}>Año actual:</Text>
              <View
                style={[
                  styles.dataReferenceColor,
                  { backgroundColor: "#005ce7" },
                ]}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  chartTitle: {
    fontFamily: "MontserratMedium",
    padding: 15,
    backgroundColor: "#2a2c2f",
    borderRadius: 10,
    fontSize: 16,
    color: "#fff",
  },
  span: {
    fontFamily: "MontserratBold",
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "#00000050",
  },
  dataReferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dataReferenceTitle: {
    fontFamily: "MontserratMedium",
  },
  dataReferenceColor: {
    width: 30,
    height: 20,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "#00000030",
  },
});
