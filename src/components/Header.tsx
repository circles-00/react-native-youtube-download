import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styled";
import { View, Text } from "react-native";
import { IHeader } from "../interfaces/components/IHeader.interface";

const Header: React.FC<IHeader> = ({playlistName, handleBackButton}) => {
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="keyboard-backspace" size={30} color="#ffffff" onPress={handleBackButton} />
      <Text style={styles.headerText}>{playlistName}</Text>
    </View>
  )
}

export default Header