import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";
import AuthProfileCard from "../components/AuthProfileCard";
import { addDoc, collection } from "firebase/firestore";
import { getUser } from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdated } from "../slices/isEditUpdated";

const AuthProfile = ({ navigation }) => {

  //TO-DO: DİĞER BUTONLARIN ACTIVE OPACITY PROP'U 0.6 OLARAK AYARLANACAK!!!!
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();
  const isUpdated = useSelector((state) => state.isUpdated);

  const handleAddCollection = async () => {
    const existingUser = await getUser(auth.currentUser.uid);
    if (!existingUser) {
      await addDoc(collection(db, "users"), {
        UserId: auth.currentUser.uid,
        Name: userData.name,
        Surname: userData.surname,
        PhoneNumber: userData.phoneNumber,
      });
    }
  };

  useEffect(() => {
    if (userData.name !== undefined && userData.name) {
      handleAddCollection();
    }

    const fetchData = async () => {
      const data = await getUser(auth.currentUser.uid);
      setUserData({
        name: data.Name,
        surname: data.Surname,
        phoneNumber: data.PhoneNumber,
      });
    };
  
    fetchData();

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
          userName={userData.name}
          surname={userData.surname}
          phoneNumber={userData.phoneNumber}
          displayPhoto={true}
          displayEditProfileText={true}
          navigation={navigation}
          routeName={"EditProfileScreen"}
        />
        <AuthProfileCard
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
