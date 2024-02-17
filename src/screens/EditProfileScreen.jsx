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
  const [newEmail, setNewEmail] = useState(auth.currentUser.email);

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    if (newEmail === auth.currentUser.email) {
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
        Alert.alert("Başarılı!", "Kullanıcı bilgileriniz güncellendi.", [
          {
            text: "TAMAM",
            onPress: () => {
              navigation.navigate("Profile");
              dispatch(setIsUpdated(true))
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
    } else {
      verifyBeforeUpdateEmail(auth.currentUser, newEmail)
        .then(() => {
          Alert.alert(
            "Başarılı!",
            "Eski mailinize e-posta güncelleme için doğrulama maili gönderilmiştir. Doğrulamanızı sağladıktan sonra mailiniz güncellenecektir.",
            [
              {
                text: "TAMAM",
                onPress: () => {
                  auth.signOut();
                  navigation.replace("LoginScreen");
                },
              },
            ]
          );
        })
        .catch((error) => {
          console.error("Başarısız!", error.message);
        });
    }
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
        placeholder="E-Posta Adresi"
        keyboardType="email-address"
        value={newEmail}
        onChangeText={setNewEmail}
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
