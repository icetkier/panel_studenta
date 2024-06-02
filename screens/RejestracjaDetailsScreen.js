import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import moment from 'moment';

// Funkcja do pobierania aktualnych danych rejestracji z Firestore
const fetchRejestracja = async (rejestracjaId) => {
  try {
    const db = getFirestore();
    const rejestracjaRef = doc(db, "rejestracje", rejestracjaId);
    const rejestracjaDoc = await getDoc(rejestracjaRef);
    if (rejestracjaDoc.exists()) {
      return rejestracjaDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching rejestracja:", error);
    return null;
  }
};

const RejestracjaDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, rejestracjaId } = route.params;

  const [rejestracja, setRejestracja] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Funkcja do pobierania danych rejestracji
  const loadRejestracja = async () => {
    const fetchedRejestracja = await fetchRejestracja(rejestracjaId);
    if (fetchedRejestracja) {
      setRejestracja(fetchedRejestracja);
    }
  };

  // Użyj useFocusEffect, aby pobrać dane przy każdym otwarciu ekranu
  useFocusEffect(
    useCallback(() => {
      loadRejestracja();
    }, [])
  );

  if (!rejestracja) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

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

  const handleRegister = async (przedmiot) => {
    try {
      const przedmiotData = rejestracja.Przedmioty[przedmiot];

      if (!przedmiotData || przedmiotData['Liczba zajętych miejsc'] === undefined || przedmiotData['Liczba miejsc'] === undefined) {
        Toast.show({
          type: 'error',
          text1: 'Dane przedmiotu są niekompletne.',
          position: 'bottom',
        });
        return;
      }

      if (przedmiotData['Liczba zajętych miejsc'] >= przedmiotData['Liczba miejsc']) {
        Toast.show({
          type: 'error',
          text1: `Brak wolnych miejsc na przedmiot: ${przedmiot}`,
          position: 'bottom',
        });
        return;
      }

      const db = getFirestore();
      const przedmiotRef = doc(db, "rejestracje", rejestracjaId);

      // Aktualizacja danych w Firestore
      const updatedPrzedmiot = {
        ...przedmiotData,
        'Liczba zajętych miejsc': przedmiotData['Liczba zajętych miejsc'] + 1,
        'Zapisany': 'Tak',
      };

      await updateDoc(przedmiotRef, {
        [`Przedmioty.${przedmiot}`]: updatedPrzedmiot,
      });

      // Zaktualizuj lokalny stan
      setRejestracja((prevRejestracja) => ({
        ...prevRejestracja,
        Przedmioty: {
          ...prevRejestracja.Przedmioty,
          [przedmiot]: updatedPrzedmiot,
        },
      }));

      Toast.show({
        type: 'success',
        text1: 'Zarejestrowano na przedmiot',
        position: 'bottom',
      });

      setRefresh(!refresh);
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
      Toast.show({
        type: 'error',
        text1: 'Wystąpił błąd podczas rejestracji',
        position: 'bottom',
      });
    }
  };

  const handleUnregister = async (przedmiot) => {
    try {
      const przedmiotData = rejestracja.Przedmioty[przedmiot];

      if (!przedmiotData || przedmiotData['Liczba zajętych miejsc'] === undefined || przedmiotData['Liczba miejsc'] === undefined) {
        Toast.show({
          type: 'error',
          text1: 'Dane przedmiotu są niekompletne.',
          position: 'bottom',
        });
        return;
      }

      if (przedmiotData['Liczba zajętych miejsc'] <= 0) {
        Toast.show({
          type: 'error',
          text1: `Nie można wypisać z przedmiotu: ${przedmiot}`,
          position: 'bottom',
        });
        return;
      }

      const db = getFirestore();
      const przedmiotRef = doc(db, "rejestracje", rejestracjaId);

      // Aktualizacja danych w Firestore
      const updatedPrzedmiot = {
        ...przedmiotData,
        'Liczba zajętych miejsc': przedmiotData['Liczba zajętych miejsc'] - 1,
        'Zapisany': 'Nie',
      };

      await updateDoc(przedmiotRef, {
        [`Przedmioty.${przedmiot}`]: updatedPrzedmiot,
      });

      // Zaktualizuj lokalny stan
      setRejestracja((prevRejestracja) => ({
        ...prevRejestracja,
        Przedmioty: {
          ...prevRejestracja.Przedmioty,
          [przedmiot]: updatedPrzedmiot,
        },
      }));

      Toast.show({
        type: 'success',
        text1: 'Wypisano z przedmiotu',
        position: 'bottom',
      });

      setRefresh(!refresh);
    } catch (error) {
      console.error("Błąd podczas wypisywania:", error);
      Toast.show({
        type: 'error',
        text1: 'Wystąpił błąd podczas wypisywania',
        position: 'bottom',
      });
    }
  };

  // Sortowanie przedmiotów alfabetycznie
  const sortedPrzedmioty = Object.keys(rejestracja.Przedmioty).sort();

  const formatDate = (date) => {
    return moment(date.toDate ? date.toDate() : date).format('HH:mm, DD MMMM YYYY');
  };

  const renderStatusIcon = (przedmiotData) => {
    if (przedmiotData['Zapisany'] === 'Tak') {
      return (
        <TouchableOpacity onPress={() => handleUnregister(przedmiotData.name)}>
          <Image source={require('../assets/images/CartMinus.png')} style={styles.statusIcon} />
        </TouchableOpacity>
      );
    } else if (przedmiotData['Liczba zajętych miejsc'] >= przedmiotData['Liczba miejsc']) {
      return <Image source={require('../assets/images/CartDeactivated.png')} style={styles.statusIcon} />;
    } else {
      return (
        <TouchableOpacity onPress={() => handleRegister(przedmiotData.name)}>
          <Image source={require('../assets/images/CartPlus.png')} style={styles.statusIcon} />
        </TouchableOpacity>
      );
    }
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
            <Text style={[styles.tableHeader, styles.tableCellStatus]}>Status</Text>
          </View>
          {sortedPrzedmioty.map((przedmiot, index) => {
            const przedmiotData = { ...rejestracja.Przedmioty[przedmiot], name: przedmiot };
            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCellPrzedmiot}>{przedmiot}</Text>
                <View style={styles.tableCell}>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { width: `${(przedmiotData['Liczba zajętych miejsc'] / przedmiotData['Liczba miejsc']) * 100}%` }
                      ]}
                    />
                  </View>
                  <Text style={styles.tableCellText}>{`${przedmiotData['Liczba zajętych miejsc']}/${przedmiotData['Liczba miejsc']}`}</Text>
                </View>
                <View style={styles.tableCellStatus}>
                  {renderStatusIcon(przedmiotData)}
                </View>
              </View>
            );
          })}
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
    marginBottom: 10,
    textAlign: 'center',
  },
  timePeriod: {
    fontSize: 16,
    color: '#464646',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginHorizontal: 5,
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
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellText: {
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellPrzedmiot: {
    flex: 2,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  tableCellStatus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '80%',
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
  statusIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
