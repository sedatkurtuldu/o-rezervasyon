import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { verifyBeforeUpdateEmail } from "@firebase/auth";
import { auth } from "../service/firebase";

const EditEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState(auth.currentUser.email);

  const handleEmailUpdate = () => {
    verifyBeforeUpdateEmail(auth.currentUser, email)
      .then(() => {
        Alert.alert(
          "Başarılı!",
          "Eski mailinize e-posta güncelleme için doğrulama maili gönderilmiştir. Doğrulamanızı sağladıktan sonra mailiniz güncellenecektir.",
          [
            {
              text: "TAMAM",
              onPress: () => {
                auth.signOut();
                navigation.navigate("Profile");
              },
            },
          ]
        );
      })
      .catch((error) => {
        console.error("Başarısız!", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-Posta Adresi"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity activeOpacity={0.6} onPress={handleEmailUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditEmailScreen;

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
