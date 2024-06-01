import React from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const ZajeciaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, clickedClass } = route.params;

  const handleProfilePress = () => {
    navigation.navigate('Profile', { user });
  };

  const handleOcenyPress = () => {
    navigation.navigate('Oceny', { user });
  };

  const handleRejestracjaPress = () => {
    navigation.navigate('Rejestracja', { user });
  };

  const handleAktualnosciPress = () => {
    navigation.navigate('Aktualnosci', { user });
  };

  const formatTime = (timestamp) => {
    return moment(timestamp.toDate ? timestamp.toDate() : timestamp).format('HH:mm');
  };

  const handleSendMessage = () => {
    // Implementuj logikę wysyłania wiadomości
    console.log('Wyślij wiadomość do studentów tej grupy');
  };

  // Sortowanie osób alfabetycznie po nazwisku
  const sortedOsoby = Object.values(clickedClass.details.Osoby || {}).sort((a, b) =>
    a.Nazwisko.localeCompare(b.Nazwisko)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/Wstecz.png')} style={styles.backImage} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{clickedClass.subject}</Text>
        <Text style={styles.subTitle}>{clickedClass.type}, gr {clickedClass.details.gr}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Prowadzący</Text>
          <Text style={styles.value}>{clickedClass.details.Prowadzący}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Termin i miejsce</Text>
          <Text style={styles.value}>{`${clickedClass.details.dzień.charAt(0).toUpperCase() + clickedClass.details.dzień.slice(1)}, ${formatTime(clickedClass.details.poczatek)} - ${formatTime(clickedClass.details.koniec)}\nsala ${clickedClass.details.Sala}, budynek ${clickedClass.details.Budynek}`}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Liczba osób w grupie</Text>
          <Text style={styles.value}>{clickedClass.details['Liczba osób']}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Wyślij wiadomość do studentów tej grupy</Text>
        </TouchableOpacity>
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={[styles.tableHeader, styles.tableCellNr]}>Nr</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>Nazwisko</Text>
            <Text style={[styles.tableHeader, styles.tableCellImiona]}>Imiona</Text>
          </View>
          {sortedOsoby.map((student, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellNr}>{index + 1}</Text>
              <Text style={styles.tableCell}>{student.Nazwisko}</Text>
              <Text style={styles.tableCellImiona}>{student.Imiona}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconBox} onPress={handleProfilePress}>
            <Image source={require('../assets/images/Profil_OFF.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={handleOcenyPress}>
            <Image source={require('../assets/images/Oceny_OFF.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <Image source={require('../assets/images/Plan_ON.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={handleRejestracjaPress}>
            <Image source={require('../assets/images/Rejestracja_OFF.png')} style={styles.iconImage} />
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  backImage: {
    width: 25,
    height: 25,
  },
  scrollView: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5, // Zmniejszony odstęp
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 16, // Zmniejszona czcionka
    fontWeight: 'normal',
    marginBottom: 20, // Zwiększony odstęp
    marginLeft: 10,
  },
  detailsContainer: {
    marginBottom: 20,
    marginLeft: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#4B8377',
  },
  button: {
    backgroundColor: "#52AF60",
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 20, // Zwiększona szerokość przycisku
    marginBottom: 22,
    alignSelf: 'center',
    width: 200, // Utrzymanie tekstu w dwóch linijkach
  },
  buttonText: {
    color: "#FEFCFC",
    fontSize: 16,
    textAlign: "center",
  },
  tableContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  tableHeaderRow: {
    backgroundColor: '#60B7A5',
  },
  tableCell: {
    flex: 2,
    fontSize: 16,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  tableCellNr: {
    flex: 0.5,
    fontSize: 16,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  tableCellImiona: {
    flex: 3,
    fontSize: 16,
    textAlign: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#fff',
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

export default ZajeciaScreen;