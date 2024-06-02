import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import moment from 'moment';
import 'moment/locale/pl';

const RejestracjaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [rejestracje, setRejestracje] = useState([]);

  useEffect(() => {
    const fetchRejestracje = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, "rejestracje"), where("album", "==", user.album));
        const querySnapshot = await getDocs(q);
        const rejestracjeData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRejestracje(rejestracjeData);
      } catch (error) {
        console.error("Error fetching rejestracje:", error);
      }
    };

    fetchRejestracje();
  }, [user.album]);

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

  const handleRejestracjaPress = (rejestracja) => {
    navigation.navigate('RejestracjaDetails', { user, rejestracjaId: rejestracja.id });
  };

  const formatDate = (timestamp) => {
    return moment(timestamp.toDate()).format('YYYY-MM-DD HH:mm');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Aktualnie prowadzone rejestracje na przedmioty</Text>
        {rejestracje.length > 0 ? (
          rejestracje.map(rejestracja => (
            <TouchableOpacity key={rejestracja.id} style={styles.registrationContainer} onPress={() => handleRejestracjaPress(rejestracja)}>
              <View style={styles.registrationBox}>
                <Text style={styles.registrationTitle}>{rejestracja.Nazwa}</Text>
              </View>
              <View style={styles.registrationDateBox}>
                <Text style={styles.registrationDate}>{`${formatDate(rejestracja.poczatek)} - ${formatDate(rejestracja.koniec)}`}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRegistrations}>Brak dostępnych rejestracji</Text>
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconBox} onPress={handleProfilePress}>
            <Image source={require('../assets/images/Profil_OFF.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={handleOcenyPress}>
            <Image source={require('../assets/images/Oceny_OFF.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={handlePlanPress}>
            <Image source={require('../assets/images/Plan_OFF.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <View style={styles.iconBox}>
            <Image source={require('../assets/images/Rejestracja_ON.png')} style={styles.iconImage} />
          </View>
          <TouchableOpacity style={styles.iconBox} onPress={handleAktualnosciPress}>
            <Image source={require('../assets/images/Aktualnosci_OFF.png')} style={styles.iconImage} />
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
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 20,
  },
  registrationContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  registrationBox: {
    backgroundColor: "#EEEEEE",
    borderColor: "#60B7A5",
    borderRadius: 6,
    borderWidth: 4,
    paddingVertical: 30,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registrationTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  registrationDateBox: {
    backgroundColor: "#FFFFFF",
    borderColor: "#60B7A5",
    borderRadius: 6,
    borderWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: -20,
    alignItems: 'center',
  },
  registrationDate: {
    color: "#000000",
    fontSize: 15,
  },
  noRegistrations: {
    textAlign: 'center',
    fontSize: 18,
    color: '#464646',
    marginTop: 20,
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
