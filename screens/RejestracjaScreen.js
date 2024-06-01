import React from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

const RejestracjaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  const handleProfilePress = () => {
    navigation.navigate('Profile', { user });
  };

  const handlePlanPress = () => {
    navigation.navigate('Plan', { user });
  };

  const handleOcenyPress = () => {
    navigation.navigate('Oceny', { user });
  };

  const handleAktualnosciPress = () => {
    navigation.navigate('Aktualnosci', { user });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Aktualnie prowadzone rejestracje na przedmioty</Text>
        <View style={styles.registrationContainer}>
          <View style={styles.registrationBox}>
            <Text style={styles.registrationTitle}>
              Rejestracja na przedmioty Bloku Innowacyjnego UBPO
            </Text>
          </View>
          <View style={styles.registrationDateBox}>
            <Text style={styles.registrationDate}>
              2024-02-20 10:00 - 2024-02-23 23:59
            </Text>
          </View>
        </View>
        <View style={styles.registrationContainer}>
          <View style={styles.registrationBox}>
            <Text style={styles.registrationTitle}>
              Rejestracja na przedmioty obieralne 23/24Z FM FT IS MNB NM 1 stopień
            </Text>
          </View>
          <View style={styles.registrationDateBox}>
            <Text style={styles.registrationDate}>
              2024-02-24 10:00 - 2024-03-07 23:59
            </Text>
          </View>
        </View>
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
          <TouchableOpacity style={styles.iconBox} onPress={handlePlanPress}>
            <Image
              source={require('../assets/images/Plan_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <View style={styles.iconBox}>
            <Image
              source={require('../assets/images/Rejestracja_ON.png')}
              style={styles.iconImage}
            />
          </View>
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
    marginBottom: 31,
    marginHorizontal: 23,
    width: 384,
  },
  registrationContainer: {
    marginBottom: 91,
    marginHorizontal: 47,
  },
  registrationBox: {
    backgroundColor: "#EEEEEE",
    borderColor: "#60B7A5",
    borderRadius: 6,
    borderWidth: 4,
    paddingVertical: 47,
    paddingHorizontal: 40,
  },
  registrationTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: 248,
  },
  registrationDateBox: {
    position: "absolute",
    bottom: -59,
    right: 0,
    left: 0,
    height: 66,
    borderColor: "#60B7A5",
    borderRadius: 6,
    borderWidth: 4,
    paddingHorizontal: 30,
  },
  registrationDate: {
    color: "#000000",
    fontSize: 15,
    marginTop: 30,
  },
  bottomContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 0,
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
    paddingHorizontal: 3,
  },
  iconImage: {
    height: 85,
    width: 85,
    resizeMode: 'contain',
  },
});

export default RejestracjaScreen;
