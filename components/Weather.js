import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  FontAwesome,
  AntDesign,
  FontAwesome5,
  Fontisto,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const icons = {
  Snow: <FontAwesome name="snowflake-o" size={40} color="black" />,
  Clouds: <AntDesign name="cloud" size={40} color="black" />,
  Rain: <FontAwesome5 name="cloud-rain" size={40} color="black" />,
  Haze: <Fontisto name="day-haze" size={40} color="black" />,
  Clear: <Feather name="sun" size={40} color="black" />,
  Smoke: <MaterialCommunityIcons name="smoke" size={40} color="black" />,
};

const API_KEY = "1e6db11e86fd080628cea5a0121e4814";

const Weather = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(null);

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  const getWeatherData = async (cityName) => {
    setLoading(true);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    getWeatherData(cityName);
  }, [cityName]);

  useEffect(() => {
    if (weatherData != null) {
      switch (weatherData.weather[0].main) {
        case "Clear":
          setIcon(icons.Clear);
          break;
        case "Smoke":
          setIcon(icons.Smoke);
          break;
        case "Snow":
          setIcon(icons.Snow);
          break;
        case "Haze":
          setIcon(icons.Haze);
          break;
        case "Rain":
          setIcon(icons.Rain);
          break;
        case "Clouds":
          setIcon(icons.Clouds);
          break;
        default:
          setIcon(null);
          break;
      }
    }
  }, [weatherData]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  } else if (weatherData == null) {
    return (
      <Text style={{ marginTop: 20, fontSize: 24, textAlign: "center" }}>
        Enter your city
      </Text>
    );
  } else {
    return (
      <View>
        <Text style={styles.Degree}>
          {kelvinToCelsius(weatherData.main.temp)}°C
        </Text>
        <Text style={styles.City}>{weatherData.name}</Text>
        <View style={styles.Icon}>
          <View>
            <Text style={styles.Humidity}>
              Humidity: {weatherData.main.humidity}
            </Text>
            <Text style={styles.Tem}>
              Weather: {weatherData.weather[0].main}
            </Text>
          </View>
          <View>{icon}</View>
        </View>
      </View>
    );
  }
};

export default Weather;

const styles = StyleSheet.create({
  Degree: {
    fontSize: 80,
    marginTop: "20%",
    textAlign: "center",
  },
  City: {
    fontSize: 25,
    textAlign: "center",
  },
  Icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 60,
    marginTop: "30%",
    alignItems: "center",
  },
  Humidity: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  Tem: {
    fontWeight: "bold",
  },
});
