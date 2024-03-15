import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function Mas() {
  const authContext = useAuth();

  return (
    <View style={styles.container}>
      <MasItem icon="help-circle-outline" text="Ayuda" />
      <MasItem icon="sync-circle-outline" text="Actualizar" />
      <MasItem icon="shield-checkmark-outline" text="Seguridad" />
      <TouchableOpacity onPress={authContext.logout}>
        <MasItem icon="log-out-outline" text="Cerrar Sesion" />
      </TouchableOpacity>
    </View>
  );
}

function MasItem({ icon, text, link }) {
  return (
    <View style={styles.buttonContainer}>
      <Ionicons style={styles.icon} name={icon} size={24} color="black" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    color: "#4260ee",
  },
  text: {
    color: "#000",
  },
});
