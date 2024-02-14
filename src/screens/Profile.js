import { StyleSheet } from "react-native";
import React from "react";
import AuthProfile from "./AuthProfile";
import UnAuthProfile from "./UnAuthProfile";

const Profile = ({ user, navigation }) => {
  return user ? <AuthProfile user={user} navigation={navigation} /> : <UnAuthProfile />;
};

export default Profile;

const styles = StyleSheet.create({
  
});
