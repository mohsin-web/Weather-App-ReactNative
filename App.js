import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";

export default function App() {
  const [savedName, setSavedName] = useState('');

  function cityNameHandler(cityName) {
    console.log(cityName);
    setSavedName(cityName);
  }

  return (
    <View style={styles.container}>
      <SearchBar cityName={cityNameHandler} />
      <Weather cityName={savedName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
