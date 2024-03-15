import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Notificacion = ({ mensaje }) => {
  const navigation = useNavigation();

  const mensajeCompleto = mensaje;

  const cortarMensaje = (mensaje, maxLength) => {
    if (mensaje.length > maxLength) {
      return mensaje.substring(0, maxLength - 3) + "...";
    } else {
      return mensaje;
    }
  };

  const mensajeCortado = cortarMensaje(mensajeCompleto, 150);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("NotificacionDetail", {
          mensaje: mensajeCompleto,
        })
      }
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="notifications"
          size={30}
          color="#1082FF"
          style={styles.icon}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Notificación</Text>
        <Text style={styles.message}>{mensajeCortado}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: 0.3,
    borderColor: "#1082FF",
  },
  iconContainer: {
    width: "10%",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "85%",
  },
  title: {
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
  message: {
    width: "auto",
    marginTop: 10,
    fontFamily: "MontserratMedium",
  },
});

export default Notificacion;
