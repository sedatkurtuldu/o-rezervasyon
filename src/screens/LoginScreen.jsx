import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../service/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    if(email === "" && password === ""){
      alert("E-Posta ve Şifre alanı boş geçilemez.")
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigation.navigate("HomeScreen");
    } catch (error) {

      console.error("Giriş yaparken bir hata oluştu: ", error.message);

      alert("Giriş yaparken bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  const toggleShowPassword = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmation") {
      setShowPasswordConfirmation(!showPasswordConfirmation);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-Posta Adresi"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => toggleShowPassword("password")}
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#ABABAB"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 18,
  },
  button: {
    backgroundColor: "#cb1d53",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    textAlign: "center",
  },
});
