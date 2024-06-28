import { useState } from "react";
import logoLogin from "../assets/images/logoLogin.png";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [company, setCompany] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();

  const login = async () => {
    console.log("Login");
    try {
      const response = await fetch(
        `http://149.100.142.117/apinova/appnova/loginEmpresa.php?_m=prod&_r=json&_e=${company}&_u=${user}&_p=${password}`
      );

      const json = await response.json();

      const token = json.data.token;

      setToken(token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Image
        src={logoLogin.url}
        alt="imagen"
        width={50}
        style={{ borderWidth: 1 }}
      />

      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Empresa"
          onChangeText={(text) => setCompany(text)}
          value={company}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={(text) => setUser(text)}
          value={user}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.inputText}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    position: "relative",
  },
  image: {
    aspectRatio: "4/3",
    objectFit: "contain",
    height: 100,
    marginBottom: 50,
  },
  inputsContainer: {
    width: "100%",
    marginVertical: 15,
    flexDirection: "column",
    gap: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.3,
  },
  buttonsContainer: {
    gap: 10,
  },
  button: {
    backgroundColor: "#2a2c2f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  inputText: {
    fontSize: 14,
    fontFamily: "MontserratMedium",
    color: "#fff",
  },
  circleBackground: {
    position: "absolute",
    width: "400%",
    height: "400%",
    backgroundColor: "#005ce7",
    top: "85%",
    borderRadius: 100000,
    borderWidth: 1,
  },
});
