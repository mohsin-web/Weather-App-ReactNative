import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = (props) => {
  const [name, setName] = useState("");

  const citynameHandler = (cityname) => {
    setName(cityname);
  };

  const enterednameHandler = () => {
    props.cityName(name);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        onChangeText={citynameHandler}
        value={name}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={enterednameHandler}
      >
        <FontAwesome name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    width: Dimensions.get("screen").width - 80,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  searchButton: {
    marginLeft: 10,
  },
});
