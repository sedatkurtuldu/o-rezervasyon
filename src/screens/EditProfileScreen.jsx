import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../service/firebase";
import { verifyBeforeUpdateEmail } from "@firebase/auth";
import { getUser } from "../service/api";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setIsUpdated } from "../slices/isEditUpdated";

const EditProfileScreen = ({ route, navigation }) => {
  const [name, setName] = useState(route.params.name);
  const [surname, setSurname] = useState(route.params.surname);
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    const data = await getUser(auth.currentUser.uid);

    const updatedUserData = {
      ...data,
      Name: name,
      Surname: surname,
      PhoneNumber: phoneNumber,
    };

    const userRef = doc(db, "users", updatedUserData.id);
    try {
      await updateDoc(userRef, updatedUserData);
      dispatch(setIsUpdated(true));
      Alert.alert("Başarılı!", "Kullanıcı bilgileriniz güncellendi.", [
        {
          text: "TAMAM",
          onPress: () => {
            navigation.navigate("Profile");
          },
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Başarısız!",
        "Kullanıcı bilgileri güncellenirken hata oluştu.",
        [
          {
            text: "TAMAM",
          },
        ]
      );

      console.error("Kullanıcı bilgileri güncellenirken hata oluştu:", error);
    }
    return;
  };

  const navigateToEmailScreen = () => {
    navigation.navigate("EditEmailScreen");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Adı"
      />
      <TextInput
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
        placeholder="Soyadı"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>

      <View style={styles.emailContainer}>
        <View>
          <Text style={styles.emailText}>E-Posta</Text>
          <Text style={styles.emailEmail}>{auth.currentUser.email}</Text>
        </View>
        <TouchableOpacity onPress={navigateToEmailScreen} activeOpacity={0.6}>
          <Text style={styles.editText}>Düzenle</Text>
        </TouchableOpacity>
      </View>
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
  emailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  emailText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  emailEmail: {
    color: "#898989",
  },
  editText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
