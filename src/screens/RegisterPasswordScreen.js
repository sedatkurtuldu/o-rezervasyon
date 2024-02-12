import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const RegisterPasswordScreen = ({ route }) => {
  const { values } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const toggleShowPassword = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmation") {
      setShowPasswordConfirmation(!showPasswordConfirmation);
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordMismatch(false);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordMismatch(false);
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    // Passwords match, proceed with registration
    // Your registration logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Şifre Tekrar"
          secureTextEntry={!showPasswordConfirmation}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => toggleShowPassword("confirmation")}
        >
          <Feather
            name={showPasswordConfirmation ? "eye-off" : "eye"}
            size={24}
            color="#ABABAB"
          />
        </TouchableOpacity>
      </View>

      {passwordMismatch && (
        <Text style={styles.errorText}>
          Şifreler eşleşmiyor, lütfen kontrol edin.
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kaydol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterPasswordScreen;

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
    textAlign: 'center'
  },
});
