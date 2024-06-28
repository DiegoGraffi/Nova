import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import logo from "../assets/images/alberto.png";
import logoNova from "../assets/images/LogoNova.png";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={logoNova} style={styles.logo} />
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.userText}>Calzados Alberto</Text>
        <Image style={styles.image} source={logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#2a2c2f",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 30,
    width: 50,
    objectFit: "contain",
    borderWidth: 1,
  },
  image: {
    borderRadius: 30,
    width: 30,
    height: 30,
  },
  userText: {
    marginRight: 10,
    fontFamily: "MontserratMedium",
    color: "#fff",
  },
});
