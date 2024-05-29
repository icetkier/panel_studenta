import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/profile_picture.png')} 
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Adam</Text>
              <Text style={styles.detailLabel}>Imię</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Kowalski</Text>
              <Text style={styles.detailLabel}>Nazwisko</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>123456</Text>
              <Text style={styles.detailLabel}>Nr Albumu</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Geoinformatyka</Text>
              <Text style={styles.detailLabel}>Kierunek</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Dyplomy</Text>
        <View style={styles.separator} />
        <View style={styles.diplomaContainer}>
          <Text style={styles.diplomaTitle}>inżynier</Text>
          <Text style={styles.diplomaLabel}>Wydział</Text>
          <Text style={styles.diplomaText}>Wydział Inżynierii Mechanicznej i Robotyki</Text>
          <Text style={styles.diplomaLabel}>Kierunek</Text>
          <Text style={styles.diplomaText}>Automatyka Przemysłowa i Robotyka</Text>
          <Text style={styles.diplomaLabel}>Temat pracy</Text>
          <Text style={styles.diplomaText}>Badanie i projektowanie układów automatyki przemysłowej dla zautomatyzowanych linii produkcyjnych</Text>
          <Text style={styles.diplomaLabel}>Wynik studiów</Text>
          <View style={styles.resultContainer}>
            <View style={styles.resultRow}>
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>4.21</Text>
              </View>
              <Text style={styles.resultLabel}>Średnia ze studiów</Text>
            </View>
            <View style={styles.resultRow}>
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>4</Text>
              </View>
              <Text style={styles.resultLabel}>Ocena z pracy</Text>
            </View>
            <View style={styles.resultRow}>
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>4.5</Text>
              </View>
              <Text style={styles.resultLabel}>Ocena z egzaminu</Text>
            </View>
            <View style={styles.resultRow}>
              <View style={styles.resultBoxGreen}>
                <Text style={styles.resultText}>4.21</Text>
              </View>
              <Text style={styles.resultLabel}>Ogólny wynik studiów</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Wyloguj się</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.iconContainer}>
        <View style={styles.iconBox}>
          <Image
            source={require('../assets/images/Profil_ON.png')}
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconBox}>
          <Image
            source={require('../assets/images/Oceny_OFF.png')}
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconBox}>
          <Image
            source={require('../assets/images/Plan_OFF.png')}
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconBox}>
          <Image
            source={require('../assets/images/Rejestracja_OFF.png')}
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconBox}>
          <Image
            source={require('../assets/images/Aktualnosci_OFF.png')}
            style={styles.iconImage}
          />
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
    paddingBottom: 120, // Zwiększony padding na dole, aby dolny pasek nie zasłaniał treści
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
  iconContainer: {
    position: 'absolute',
    bottom: 25, // Zmniejszony przesunięty pasek do góry
    left: 0,
    right: 0,
    height: 80, // Zwiększony height paska
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
  },
  iconBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, // Więcej wolnego miejsca nad ikonkami
  },
  iconImage: {
    width: 50,
    height: 50,
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
