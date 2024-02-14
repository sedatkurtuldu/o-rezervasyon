import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../service/firebase";
import AuthProfileCard from "../components/AuthProfileCard";

const AuthProfile = ({ user, navigation }) => {
  //TO-DO: DİĞER BUTONLARIN ACTIVE OPACITY PROP'U 0.6 OLARAK AYARLANACAK!!!!
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error("Çıkış yaparken hata oluştu: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profil</Text>
        <AuthProfileCard userName={user.displayName} displayPhoto={true} displayEditProfileText={true} />
        <AuthProfileCard userName={user.displayName} displayPhoto={false} displayEditProfileText={false} />
      </View>
      <TouchableOpacity style={styles.logOutButton} activeOpacity={0.6} onPress={logOut}>
        <Text style={styles.logOutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    marginHorizontal: 16,
    gap: 20,
    flex: 1
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
  logOutButton: {
    backgroundColor: "#cb1d53",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 20
  },
  logOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  }
});
