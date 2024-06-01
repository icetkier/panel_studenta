import React from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const RejestracjaDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, rejestracja } = route.params;

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

  // Sortowanie przedmiotów alfabetycznie
  const sortedPrzedmioty = Object.keys(rejestracja.Przedmioty).sort();

  const formatDate = (date) => {
    return moment(date.toDate ? date.toDate() : date).format('HH:mm, DD MMMM YYYY');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/Wstecz.png')} style={styles.backImage} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{rejestracja.Nazwa}</Text>
        <Text style={styles.timePeriod}>
          {`${formatDate(rejestracja.poczatek)} - ${formatDate(rejestracja.koniec)}`}
        </Text>
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={[styles.tableHeader, styles.tableCellPrzedmiot]}>Przedmiot</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>Liczba miejsc</Text>
            <Text style={[styles.tableHeader, styles.tableCellZapisany]}>Zapisany</Text>
          </View>
          {sortedPrzedmioty.map((przedmiot, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellPrzedmiot}>{przedmiot}</Text>
              <View style={styles.tableCell}>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${(rejestracja.Przedmioty[przedmiot]['Liczba zajętych miejsc'] / rejestracja.Przedmioty[przedmiot]['Liczba miejsc']) * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.tableCellText}>{`${rejestracja.Przedmioty[przedmiot]['Liczba zajętych miejsc']}/${rejestracja.Przedmioty[przedmiot]['Liczba miejsc']}`}</Text>
              </View>
              <Text style={styles.tableCellZapisany}>{rejestracja.Przedmioty[przedmiot]['Zapisany']}</Text>
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Adjusted margin to make room for time period
    textAlign: 'center',
  },
  timePeriod: {
    fontSize: 16,
    color: '#464646',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginHorizontal: 5, // Poszerzone marginesy dla tabeli
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
    alignItems: 'center',
  },
  tableHeaderRow: {
    backgroundColor: '#60B7A5',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  tableCellText: {
    fontSize: 16,
    textAlign: 'center',
  },
  tableCellPrzedmiot: {
    flex: 2,
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  tableCellZapisany: {
    flex: 1, // Poszerzona kolumna Zapisany
    fontSize: 16,
    textAlign: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#fff',
    textAlignVertical: 'center',
  },
  progressBarContainer: {
    width: '80%', // Poszerzona szerokość paska zapełnienia
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#60B7A5',
    borderRadius: 5,
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

export default RejestracjaDetailsScreen;