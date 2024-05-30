import React from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";

const PlanScreen = ({ navigation }) => {
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleOcenyPress = () => {
    navigation.navigate('Oceny');
  };

  const handleRejestracjaPress = () => {
    navigation.navigate('Rejestracja');
  };

  const handleAktualnosciPress = () => {
    navigation.navigate('Aktualnosci');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Plan zajęć</Text>
        {/* Zawartość ekranu planu zajęć */}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconBox} onPress={handleProfilePress}>
            <Image
              source={require('../assets/images/Profil_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={handleOcenyPress}>
            <Image
              source={require('../assets/images/Oceny_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <View style={styles.iconBox}>
            <Image
              source={require('../assets/images/Plan_ON.png')}
              style={styles.iconImage}
            />
          </View>
          <TouchableOpacity style={styles.iconBox} onPress={handleRejestracjaPress}>
            <Image
              source={require('../assets/images/Rejestracja_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={handleAktualnosciPress}>
            <Image
              source={require('../assets/images/Aktualnosci_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  bottomContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
  },
  iconBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
});

export default PlanScreen;
