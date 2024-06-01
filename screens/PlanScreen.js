import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import moment from 'moment';
import 'moment/locale/pl';

moment.locale('pl');

const PlanScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  const [currentWeek, setCurrentWeek] = useState(moment().startOf('isoWeek'));
  const [selectedDay, setSelectedDay] = useState(moment().isoWeekday());
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    setSelectedDay(moment().isoWeekday());
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "zajecia", user.album.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSchedule(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchSchedule();
  }, [user.album]);

  const handlePrevWeek = () => {
    setCurrentWeek(prevWeek => moment(prevWeek).subtract(1, 'weeks'));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => moment(prevWeek).add(1, 'weeks'));
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => moment(currentWeek).isoWeekday(i + 1));

  const getMonthYearLabel = () => {
    const startMonth = moment(currentWeek).format('MMMM');
    const endMonth = moment(currentWeek).endOf('isoWeek').format('MMMM');
    const year = moment(currentWeek).format('YYYY');
    return startMonth === endMonth ? `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${year}` : `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)}/${endMonth.charAt(0).toUpperCase() + endMonth.slice(1)} ${year}`;
  };

  const getDaySchedule = (day) => {
    const dayName = day.format('dddd').toLowerCase();
    const daySchedule = [];
    for (const [subject, types] of Object.entries(schedule)) {
      for (const [type, details] of Object.entries(types)) {
        if (details.dzień && details.dzień.toLowerCase() === dayName) {
          const start = moment(details.poczatek.toDate ? details.poczatek.toDate() : details.poczatek);
          const end = moment(details.koniec.toDate ? details.koniec.toDate() : details.koniec);

          if (start.isSameOrBefore(day, 'day') && end.isSameOrAfter(day, 'day')) {
            daySchedule.push({ subject, type, details });
          }
        }
      }
    }

    daySchedule.sort((a, b) => {
      const timeA = moment(a.details.poczatek.toDate ? a.details.poczatek.toDate() : a.details.poczatek).format('HH:mm');
      const timeB = moment(b.details.poczatek.toDate ? b.details.poczatek.toDate() : b.details.poczatek).format('HH:mm');
      return timeA.localeCompare(timeB);
    });

    return daySchedule;
  };

  const selectedDaySchedule = selectedDay && daysOfWeek[selectedDay - 1] ? getDaySchedule(daysOfWeek[selectedDay - 1]) : [];

  const handleProfilePress = () => {
    navigation.navigate('Profile', { user });
  };

  const handlePlanPress = () => {
    navigation.navigate('Plan', { user });
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

  const getBorderColor = (type) => {
    switch (type) {
      case 'Ćwiczenia laboratoryjne':
        return '#FFB017';
      case 'Ćwiczenia projektowe':
        return '#2CAFC1';
      case 'Wykład':
        return '#60B7A5';
      default:
        return '#52AF61';
    }
  };

  const handleClassPress = (item) => {
    navigation.navigate('Zajecia', { user, clickedClass: item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Plan zajęć</Text>
        <Text style={styles.monthLabel}>{getMonthYearLabel()}</Text>
        <View style={styles.weekContainer}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Image source={require('../assets/images/StrzałkaLewo.png')} style={styles.arrowImage} />
          </TouchableOpacity>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedDay(day.isoWeekday())}>
              <View style={[styles.dayBox, selectedDay === day.isoWeekday() && styles.selectedDayBox]}>
                <Text style={styles.dayText}>{day.format('ddd').charAt(0).toUpperCase() + day.format('ddd').slice(1)}</Text>
                <Text style={styles.dateText}>{day.format('D')}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleNextWeek}>
            <Image source={require('../assets/images/StrzałkaPrawo.png')} style={styles.arrowImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        {selectedDaySchedule.length > 0 ? (
          selectedDaySchedule.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleClassPress(item)}>
              <View style={[styles.classContainer, { borderColor: getBorderColor(item.type) }]}>
                <View style={styles.classDetails}>
                  <Text style={styles.classType}>{item.type}, gr {item.details.gr}</Text>
                  <Text style={styles.classSubject}>{item.subject}</Text>
                  <Text style={styles.classTimeLabel}>Godz.</Text>
                  <Text style={styles.classTime}>{moment(item.details.poczatek.toDate ? item.details.poczatek.toDate() : item.details.poczatek).format('HH:mm')} - {moment(item.details.koniec.toDate ? item.details.koniec.toDate() : item.details.koniec).format('HH:mm')}</Text>
                </View>
                <View style={styles.verticalSeparator} />
                <View style={styles.classLocation}>
                  <View style={styles.locationRow}>
                    <Text style={styles.locationLabel}>Sala</Text>
                    <Text style={styles.locationValue}>{item.details.Sala}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Text style={styles.locationLabel}>Budynek</Text>
                    <Text style={styles.locationValue}>{item.details.Budynek}</Text>
                  </View>
                  <Text style={styles.classInstructorLabel}>Prowadzący</Text>
                  <Text style={styles.classInstructor}>{item.details.Prowadzący}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noClassesText}>Brak zajęć do wyświetlenia</Text>
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
          <TouchableOpacity style={styles.iconBox} onPress={handleOcenyPress}>
            <Image
              source={require('../assets/images/Oceny_OFF.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <View style={styles.iconBox}>
            <Image
              source={require('../assets/images/Plan_ON.png')}
              style={styles.iconImage}
            />
          </View>
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10, // Dodano margines z lewej strony
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  arrowImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  dayBox: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#60B7A5',
    borderRadius: 8,
    marginHorizontal: 1,
  },
  selectedDayBox: {
    backgroundColor: '#60B7A5',
  },
  dayText: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  separator: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 10,
  },
  classContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  classDetails: {
    flex: 2,
    marginRight: 10,
  },
  classType: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 5,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  classTimeLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  classTime: {
    fontSize: 14,
    color: '#4B8377',
  },
  verticalSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: '#5F5F5F',
    marginHorizontal: 10,
  },
  classLocation: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  locationValue: {
    fontSize: 14,
    color: '#4B8377',
  },
  classInstructorLabel: {
    fontSize: 12,
    marginTop: 10,
  },
  classInstructor: {
    fontSize: 14,
    color: '#4B8377',
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
  noClassesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4B8377',
    marginTop: 20,
  },
});

export default PlanScreen;
