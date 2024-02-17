import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AuthProfile from "./AuthProfile";
import UnAuthProfile from "./UnAuthProfile";
import { auth } from "../service/firebase";

const Profile = ({ navigation }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return user ? <AuthProfile navigation={navigation} /> : <UnAuthProfile />;
};

export default Profile;

const styles = StyleSheet.create({});
