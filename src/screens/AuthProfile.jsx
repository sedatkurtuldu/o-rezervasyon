import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";
import AuthProfileCard from "../components/AuthProfileCard";
import { addDoc, collection } from "firebase/firestore";
import { getUser } from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdated } from "../slices/isEditUpdated";
import { setName, setPhone, setSurname } from "../slices/userSlice";

const AuthProfile = ({ navigation }) => {
  //TO-DO: DİĞER BUTONLARIN ACTIVE OPACITY PROP'U 0.6 OLARAK AYARLANACAK!!!!
  //TO-DO: REGİSTER OLURKEN PROMISE UNRESOLVE HATASI VAR ONA BAK!!!
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isUpdated = useSelector((state) => state.isUpdated);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser(auth.currentUser.uid);
      dispatch(setName(data.Name));
      dispatch(setSurname(data.Surname));
      dispatch(setPhone(data.PhoneNumber));
    };

    if (isUpdated) {
      fetchData();
      dispatch(setIsUpdated(false));
    }
  }, [isUpdated]);

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
        <AuthProfileCard
          userName={user.name}
          surname={user.surname}
          phoneNumber={user.phone}
          displayPhoto={true}
          displayEditProfileText={true}
          navigation={navigation}
          routeName={"EditProfileScreen"}
        />

        <AuthProfileCard
          userName={user.name}
          surname={user.surname}
          phoneNumber={user.phone}
          displayPhoto={false}
          displayEditProfileText={false}
          navigation={navigation}
        />
      </View>
      <TouchableOpacity
        style={styles.logOutButton}
        activeOpacity={0.6}
        onPress={logOut}
      >
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
    flex: 1,
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
    marginBottom: 20,
  },
  logOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
