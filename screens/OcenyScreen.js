import React from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";

const OcenyScreen = ({ navigation }) => {
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handlePlanPress = () => {
    navigation.navigate('Plan');
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
        <Text style={styles.title}>Oceny</Text>
        <Text style={styles.subTitle}>Geoinformatyka, II stopnia</Text>
        <View style={styles.separator} />
        <Text style={styles.semester}>Semestr letni 2023/2024</Text>
        <View style={styles.gradeRow}>
          <View style={styles.courseBox}>
            <Text style={styles.courseText}>Analiza danych multimedialnych</Text>
          </View>
          <View style={styles.gradeBox}>
            <View style={styles.gradeTextContainer}>
              <Text style={styles.gradeLabel}>Ocena:</Text>
              <Text style={styles.gradeLabel}>CWL:</Text>
            </View>
            <View style={styles.gradeSeparator} />
            <View style={styles.gradeValueContainer}>
              <Text style={styles.gradeValue}>4,5</Text>
              <Text style={styles.gradeValue}>4,5</Text>
            </View>
          </View>
        </View>
        <View style={styles.gradeRow}>
          <View style={styles.courseBox}>
            <Text style={styles.courseText}>Wprowadzenie do języka Python</Text>
          </View>
          <View style={styles.gradeBox}>
            <View style={styles.gradeTextContainer}>
              <Text style={styles.gradeLabel}>Ocena:</Text>
              <Text style={styles.gradeLabel}>CWP:</Text>
            </View>
            <View style={styles.gradeSeparator} />
            <View style={styles.gradeValueContainer}>
              <Text style={styles.gradeValue}>4</Text>
              <Text style={styles.gradeValue}>4</Text>
            </View>
          </View>
        </View>
        <View style={styles.gradeRow}>
          <View style={styles.courseBox}>
            <Text style={styles.courseText}>Podstawy fizyki</Text>
          </View>
          <View style={styles.gradeBox}>
            <View style={styles.gradeTextContainer}>
              <Text style={styles.gradeLabel}>Ocena:</Text>
              <Text style={styles.gradeLabel}>EGZ:</Text>
              <Text style={styles.gradeLabel}>CWA:</Text>
            </View>
            <View style={styles.gradeSeparator} />
            <View style={styles.gradeValueContainer}>
              <Text style={styles.gradeValue}>3</Text>
              <Text style={styles.gradeValue}>3</Text>
              <Text style={styles.gradeValue}>3,5</Text>
            </View>
          </View>
        </View>
        <View style={styles.gradeRow}>
          <View style={styles.courseBox}>
            <Text style={styles.courseText}>Podstawy grafiki komputerowej</Text>
          </View>
          <View style={styles.gradeBox}>
            <View style={styles.gradeTextContainer}>
              <Text style={styles.gradeLabel}>Ocena:</Text>
              <Text style={styles.gradeLabel}>CWP:</Text>
            </View>
            <View style={styles.gradeSeparator} />
            <View style={styles.gradeValueContainer}>
              <Text style={styles.gradeValue}>5</Text>
              <Text style={styles.gradeValue}>5</Text>
            </View>
          </View>
        </View>
        <View style={styles.gradeRow}>
          <View style={styles.courseBox}>
            <Text style={styles.courseText}>Zaawansowane techniki internetowe</Text>
          </View>
          <View style={styles.gradeBox}>
            <View style={styles.gradeTextContainer}>
              <Text style={styles.gradeLabel}>Ocena:</Text>
              <Text style={styles.gradeLabel}>CWP:</Text>
            </View>
            <View style={styles.gradeSeparator} />
            <View style={styles.gradeValueContainer}>
              <Text style={styles.gradeValue}>4,5</Text>
              <Text style={styles.gradeValue}>4,5</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconBox} onPress={handleProfilePress}>
            <Image
              source={require('../assets/images/Profil_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <View style={styles.iconBox}>
            <Image
              source={require('../assets/images/Oceny_ON.png')}
              style={styles.iconImage}
            />
          </View>
          <TouchableOpacity style={styles.iconBox} onPress={handlePlanPress}>
            <Image
              source={require('../assets/images/Plan_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
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
    color: "#464646",
    fontSize: 24,
    marginBottom: 37,
    marginLeft: 21,
  },
  subTitle: {
    color: "#000000",
    fontSize: 15,
    marginBottom: 26,
    marginLeft: 21,
  },
  separator: {
    height: 1,
    backgroundColor: "#000000",
    marginBottom: 30,
    marginHorizontal: 14,
  },
  semester: {
    color: "#000000",
    fontSize: 12,
    marginBottom: 19,
    marginLeft: 15,
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    marginHorizontal: 14,
  },
  courseBox: {
    width: 247,
    alignItems: "center",
    borderColor: "#60B7A5",
    borderRadius: 6,
    borderWidth: 4,
    paddingVertical: 32,
    marginRight: 15,
  },
  courseText: {
    color: "#464646",
    fontSize: 14,
  },
  gradeBox: {
    width: 113,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderColor: "#4B8377",
    borderRadius: 6,
    borderWidth: 3,
    paddingVertical: 17,
    paddingHorizontal: 13,
  },
  gradeTextContainer: {
    width: 46,
  },
  gradeLabel: {
    color: "#464646",
    fontSize: 14,
    marginBottom: 11,
  },
  gradeSeparator: {
    width: 1,
    backgroundColor: "#000000",
    height: 41,
  },
  gradeValueContainer: {
    width: 19,
  },
  gradeValue: {
    color: "#464646",
    fontSize: 14,
    marginBottom: 10,
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

export default OcenyScreen;