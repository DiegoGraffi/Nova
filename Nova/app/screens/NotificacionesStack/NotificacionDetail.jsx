import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

const NotificacionDetail = ({ route }) => {
  const { mensaje } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{mensaje}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
});

export default NotificacionDetail;
