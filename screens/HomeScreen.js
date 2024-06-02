import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Image, Text, Modal, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          resizeMode={'stretch'}
          style={styles.imageBackground}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleInfoPress}>
              <Image 
                source={require('../assets/images/Info.png')}
                style={styles.infoIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.topSection}>
            <Image 
              source={require('../assets/images/WGGIOS_Logo.png')}
              style={styles.logo}
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.loginText}>Zaloguj się używając konta AGH</Text>
          </TouchableOpacity>
        </ImageBackground>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Jest to aplikacja dla aktualnych studentów AGH posiadających ważne konto w domenie AGH.</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Zamknij</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageBackground: {
    height: 932,
    paddingTop: 150, 
  },
  header: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  infoIcon: {
    width: 30,
    height: 30,
  },
  topSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60, 
    marginHorizontal: 47,
  },
  logo: {
    width: 290, 
    height: 290, 
    resizeMode: 'contain',
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#52AF60",
    borderRadius: 14,
    paddingVertical: 21,
    marginBottom: 160, 
    marginHorizontal: 27,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#52AF60",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default HomeScreen;
