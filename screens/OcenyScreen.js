import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'; // Import Firestore database

const OcenyScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [grades, setGrades] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const docRef = doc(db, "oceny", user.album.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data()); // Debugging line
          setGrades(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchGrades();
  }, [user.album]);

  const handleProfilePress = () => {
    navigation.navigate('Profile', { user });
  };

  const handlePlanPress = () => {
    navigation.navigate('Plan', { user });
  };

  const handleRejestracjaPress = () => {
    navigation.navigate('Rejestracja', { user });
  };

  const handleAktualnosciPress = () => {
    navigation.navigate('Aktualnosci', { user });
  };

  const sortSemesters = (semesters) => {
    const semesterOrder = { "zimowy": 0, "letni": 1 };
    return semesters.sort((a, b) => {
      const [aYear, aSeason] = a.split(" ").reverse();
      const [bYear, bSeason] = b.split(" ").reverse();
      const aSemesterOrder = parseInt(aYear) * 2 + semesterOrder[aSeason.toLowerCase()];
      const bSemesterOrder = parseInt(bYear) * 2 + semesterOrder[bSeason.toLowerCase()];
      return bSemesterOrder - aSemesterOrder;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Oceny</Text>
        <Text style={styles.subTitle}>{user.kierunek}</Text>
        <View style={styles.separator} />
        {grades ? (
          Object.keys(grades).map((degree, degreeIndex) => {
            const sortedSemesters = sortSemesters(Object.keys(grades[degree]));
            return (
              <View key={degreeIndex} style={styles.degreeContainer}>
                {sortedSemesters.map((semester, semesterIndex) => (
                  <View key={`${degreeIndex}-${semesterIndex}`} style={styles.semesterContainer}>
                    <Text style={styles.semester}>{semester}</Text>
                    {Object.keys(grades[degree][semester]).map((course, courseIndex) => (
                      <View key={courseIndex} style={styles.gradeRow}>
                        <View style={styles.courseBox}>
                          <Text style={styles.courseText}>{course}</Text>
                        </View>
                        <View style={styles.gradeBox}>
                          <View style={styles.gradeRowContainer}>
                            <Text style={styles.gradeLabel}>Ocena:</Text>
                            <Text style={styles.gradeValue}>{grades[degree][semester][course].Ocena ?? '-'}</Text>
                          </View>
                          <View style={styles.gradeSeparatorHorizontal} />
                          {Object.keys(grades[degree][semester][course]).filter(key => key !== 'Ocena').map((subKey, subIndex) => (
                            <View key={subIndex} style={styles.gradeRowContainer}>
                              <Text style={styles.gradeLabel}>{subKey}:</Text>
                              <Text style={styles.gradeValue}>{grades[degree][semester][course][subKey] ?? '-'}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
                <View style={styles.separator} />
              </View>
            );
          })
        ) : (
          <Text style={styles.noGradesText}>Brak ocen do wyświetlenia</Text>
        )}
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
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 20, // Increased margin between title and subTitle
  },
  subTitle: {
    color: "#000000",
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#000000",
    marginBottom: 10,
  },
  semester: {
    color: "#000000",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 7,
  },
  semesterContainer: {
    marginBottom: 20, // Odstęp między semestrami
  },
  degreeContainer: {
    marginBottom: 20, // Odstęp między przedmiotami w semestrze
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    marginHorizontal: 15, // Odstęp po obu stronach
  },
  courseBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#60B7A5",
    borderRadius: 6,
    borderWidth: 4,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginRight: 15, // Odstęp między nazwą przedmiotu a ocenami
  },
  courseText: {
    textAlign: "center",
    color: "#464646",
    fontSize: 14,
  },
  gradeBox: {
    width: 140,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#EEEEEE",
    borderColor: "#4B8377",
    borderRadius: 6,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  gradeRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  gradeLabel: {
    color: "#464646",
    fontSize: 14,
    marginRight: 5,
  },
  gradeValue: {
    color: "#464646",
    fontSize: 14,
  },
  gradeSeparatorHorizontal: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 5,
    alignSelf: "stretch",
  },
  noGradesText: {
    color: "#464646",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
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