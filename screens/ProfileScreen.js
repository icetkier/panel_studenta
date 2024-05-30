import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Modal, StatusBar } from "react-native";
import { getProfilePictureURL } from '../firebase'; // Import funkcji z firebase.js

const ProfileScreen = ({ route, navigation }) => {
  const user = route.params ? route.params.user : null;
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user) {
        const url = await getProfilePictureURL(user.album);
        if (url) {
          setProfilePicture(url);
        }
      }
    };

    fetchProfilePicture();
  }, [user]);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  const cancelLogout = () => {
    setModalVisible(false);
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen, { user });
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centered}>
          <Text style={styles.errorText}>Błąd: Brak danych użytkownika</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileContainer}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('../assets/images/profile_picture.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Imię</Text>
              <Text style={styles.detailText}>{user.imie}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nazwisko</Text>
              <Text style={styles.detailText}>{user.nazwisko}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nr Albumu</Text>
              <Text style={styles.detailText}>{user.album}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Kierunek</Text>
              <Text style={styles.detailText}>{user.kierunek}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Dyplomy</Text>
        <View style={styles.separator} />
        {user.dyplom ? (
          <View style={styles.diplomaContainer}>
            <Text style={styles.diplomaTitle}>{user.dyplom.tytul}</Text>
            <Text style={styles.diplomaLabel}>Wydział</Text>
            <Text style={styles.diplomaText}>{user.dyplom.wydzial}</Text>
            <Text style={styles.diplomaLabel}>Kierunek</Text>
            <Text style={styles.diplomaText}>{user.dyplom.kierunek}</Text>
            <Text style={styles.diplomaLabel}>Temat pracy</Text>
            <Text style={styles.diplomaText}>{user.dyplom.temat}</Text>
            <Text style={styles.diplomaLabel}>Wynik studiów</Text>
            <View style={styles.resultContainer}>
              <View style={styles.resultRow}>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>{user.dyplom.ocena_srednia}</Text>
                </View>
                <Text style={styles.resultLabel}>Średnia ze studiów</Text>
              </View>
              <View style={styles.resultRow}>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>{user.dyplom.ocena_praca}</Text>
                </View>
                <Text style={styles.resultLabel}>Ocena z pracy</Text>
              </View>
              <View style={styles.resultRow}>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>{user.dyplom.ocena_egzamin}</Text>
                </View>
                <Text style={styles.resultLabel}>Ocena z egzaminu</Text>
              </View>
              <View style={styles.resultRow}>
                <View style={styles.resultBoxGreen}>
                  <Text style={styles.resultText}>{user.dyplom.ocena_ogolna}</Text>
                </View>
                <Text style={styles.resultLabel}>Ogólny wynik studiów</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyDiplomaContainer} />
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Wyloguj się</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <View style={styles.iconBox}>
            <Image
              source={require('../assets/images/Profil_ON.png')}
              style={styles.iconImage}
            />
          </View>
          <TouchableOpacity style={styles.iconBox} onPress={() => handleNavigation('Oceny')}>
            <Image
              source={require('../assets/images/Oceny_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={() => handleNavigation('Plan')}>
            <Image
              source={require('../assets/images/Plan_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={() => handleNavigation('Rejestracja')}>
            <Image
              source={require('../assets/images/Rejestracja_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={() => handleNavigation('Aktualnosci')}>
            <Image
              source={require('../assets/images/Aktualnosci_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Czy na pewno chcesz się wylogować?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={confirmLogout} style={[styles.modalButton, styles.modalButtonYes]}>
                <Text style={styles.modalButtonTextYes}>Tak</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelLogout} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Nie</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    paddingTop: 30, // Zwiększony odstęp zawartości od góry strony
    paddingBottom: 20, // Zmniejszony padding na dole
  },
  profileContainer: {
    flexDirection: "row",
    marginBottom: 40, // Zwiększony odstęp między zdjęciem a napisem "Dyplomy"
    marginHorizontal: 28,
  },
  profileImage: {
    borderRadius: 42,
    width: 157,
    height: 157,
    marginRight: 32,
  },
  profileDetails: {
    flex: 1,
    justifyContent: "center",
  },
  detailRow: {
    marginBottom: 5, // Zmniejszony odstęp
  },
  detailText: {
    color: "#464646",
    fontSize: 16,
  },
  detailLabel: {
    color: "#56AF64",
    fontSize: 12,
  },
  sectionTitle: {
    color: "#464646",
    fontSize: 20,
    marginBottom: 10, // Zmniejszono odstęp między napisem "Dyplomy" a dolną kreską
    marginLeft: 40,
    marginTop: 0, // Zwiększono odstęp nad napisem "Dyplomy"
  },
  separator: {
    height: 1,
    backgroundColor: "#000000",
    marginBottom: 10, // Zmniejszony odstęp
    marginHorizontal: 14,
  },
  diplomaContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 17,
    paddingTop: 20, // Zmniejszony odstęp
    paddingBottom: 30, // Zmniejszony odstęp
    paddingHorizontal: 20,
    marginBottom: 20, // Zmniejszony odstęp
    marginHorizontal: 14,
  },
  emptyDiplomaContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 17,
    paddingTop: 20, // Zmniejszony odstęp
    paddingBottom: 30, // Zmniejszony odstęp
    paddingHorizontal: 20,
    marginBottom: 20, // Zmniejszony odstęp
    marginHorizontal: 14,
  },
  diplomaTitle: {
    color: "#464646",
    fontSize: 16,
    marginBottom: 7,
  },
  diplomaLabel: {
    color: "#56AF64",
    fontSize: 10,
    marginBottom: 3,
  },
  diplomaText: {
    color: "#000000",
    fontSize: 11,
    marginBottom: 15, // Zmniejszony odstęp
  },
  resultContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: '48%',
  },
  resultBox: {
    width: 50, // Zmniejszone kwadraciki
    height: 50, // Zmniejszone kwadraciki
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#204C4F",
    borderRadius: 4,
    marginRight: 10,
  },
  resultBoxGreen: {
    width: 50, // Zmniejszone kwadraciki
    height: 50, // Zmniejszone kwadraciki
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#52AF60",
    borderRadius: 4,
    marginRight: 10,
  },
  resultText: {
    color: "#EEEEEE",
    fontSize: 12,
  },
  resultLabel: {
    color: "#000000",
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap', // Zawijanie tekstu do drugiej linijki
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
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10, // Przesunięcie przycisku w dół
  },
  logoutText: {
    color: "#52AF60",
    fontSize: 20,
    textAlign: 'center', // Wyśrodkowanie przycisku
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10, // Zaokrąglone rogi
    marginHorizontal: 5, // Margines między przyciskami
  },
  modalButtonYes: {
    backgroundColor: "#52AF60", // Zielone tło dla przycisku "Tak"
  },
  modalButtonTextYes: {
    color: "#FFFFFF", // Biała czcionka dla przycisku "Tak"
    fontSize: 18,
  },
  modalButtonText: {
    color: "#52AF60",
    fontSize: 18,
  },
});

export default ProfileScreen;