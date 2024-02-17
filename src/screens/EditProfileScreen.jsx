import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../service/firebase";

const EditProfileScreen = ({ route }) => {
  const { name, surname, phoneNumber } = route.params;

  return (
    <View style={styles.container}>
      <TextInput value={name} style={styles.input} placeholder="Adı" />
      <TextInput value={surname} style={styles.input} placeholder="Soyadı" />
      <TextInput
        style={styles.input}
        placeholder="E-Posta Adresi"
        keyboardType="email-address"
        value={auth.currentUser.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        keyboardType="phone-pad"
        value={phoneNumber}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

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
