import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const UnAuthProfile = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("LoginScreen")
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profiliniz</Text>
        <Text style={styles.profileTextDescription}>
          Bilgilere erişmek için lütfen giriş yapın.
        </Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Oturum açın</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerContainer}>
        <Text>Hesabınız yok mu?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.registerText}>Kaydolun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UnAuthProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    marginHorizontal: 16,
  },
  profileText: {
    fontSize: 26,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "bold",
  },
  profileTextDescription: {
    fontSize: 16,
  },
  loginButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    
  },
  loginButton: {
    backgroundColor: "#cb1d53",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width:"90%"
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 20,
    marginHorizontal: 20,
  },
  registerText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
