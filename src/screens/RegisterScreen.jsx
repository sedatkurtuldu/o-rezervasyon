import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "+90",
  });

  const handleToPasswordScreen = () => {
    if (values.name && values.surname && values.email && values.phone) {
      navigation.navigate("RegisterPasswordScreen", { values });
    } else {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.",[
        {
          text: "TAMAM"
        },
      ]);
    }
  };

  const handleChange = (field, value) => {
    setValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={values.name}
        placeholder="Adı"
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        style={styles.input}
        value={values.surname}
        placeholder="Soyadı"
        onChangeText={(value) => handleChange("surname", value)}
      />
      <TextInput
        style={styles.input}
        value={values.email}
        placeholder="E-Posta Adresi"
        keyboardType="email-address"
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.input}
        value={values.phone}
        placeholder="Telefon"
        keyboardType="phone-pad"
        onChangeText={(value) => handleChange("phone", value)}
      />

      <TouchableOpacity onPress={handleToPasswordScreen} style={styles.button}>
        <Text style={styles.buttonText}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    fontSize: 16,
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
});
