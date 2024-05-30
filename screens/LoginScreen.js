import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Keyboard, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase'; // Import Firestore database

const LoginScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const handleLoginPress = async () => {
    let valid = true;
    if (!email) {
      setEmailError('Nie wpisano adresu e-mail');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Nie wpisano hasła');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (valid) {
      try {
        console.log('Attempting to log in with:', email, password);
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        let authenticated = false;
        let userData = null;

        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            userData = doc.data();
            console.log('Found user:', userData);
            if (userData.haslo === password) { // Używamy poprawnego klucza "hasło"
              authenticated = true;
            }
          }
        });

        if (authenticated) {
          console.log('Login successful!');
          navigation.navigate('Profile', { user: userData });
        } else {
          console.log('Invalid email or password');
          setLoginError('Nieprawidłowy e-mail lub hasło');
        }
      } catch (error) {
        console.error("Error logging in: ", error);
        setLoginError('Wystąpił błąd podczas logowania');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={0} // Ustawienie na 0 dla iOS
      >
        <ScrollView contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../assets/images/Wstecz.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            <View style={[styles.imageContainer, styles.welcomeImageContainer]}>
              <Image
                source={require('../assets/images/Witaj_WGGIOS.png')} 
                resizeMode={"contain"}
                style={styles.welcomeImage}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/Globe.png')} 
                resizeMode={"contain"}
                style={styles.globeImage}
              />
            </View>
          </ScrollView>
          <View style={styles.loginContainer}>
            <Text style={styles.loginPrompt}>
              Zaloguj się aby kontynuować
            </Text>
            <Text style={[styles.label, emailError && styles.errorLabel]}>
              Adres e-mail
            </Text>
            <TextInput 
              style={[styles.input, emailError && styles.errorInput]}
              placeholder="Wprowadź adres e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <Text style={[styles.label, passwordError && styles.errorLabel]}>
              Hasło
            </Text>
            <TextInput 
              style={[styles.input, passwordError && styles.errorInput]}
              placeholder="Wprowadź hasło"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
            <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
              <Text style={styles.loginButtonText}>
                Zaloguj się
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: 240,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  horizontalScroll: {
    flexDirection: "row",
    marginBottom: 20,
  },
  horizontalScrollContent: {
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeImageContainer: {
    marginLeft: 20,
  },
  welcomeImage: {
    width: 207,
    height: 207,
  },
  globeImage: {
    width: 212,
    height: 212,
  },
  loginContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  loginPrompt: {
    color: "#464646",
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    color: "#2E2E2E",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 20,
  },
  input: {
    height: 42,
    backgroundColor: "#D9D9D9",
    borderRadius: 2,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#52AF60",
    borderRadius: 14,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#FEFCFC",
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorLabel: {
    color: 'red',
  },
});

export default LoginScreen;
