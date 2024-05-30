import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Linking } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigation, useRoute } from '@react-navigation/native';

const AktualnosciScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const db = getFirestore();
      const newsCollection = collection(db, "aktualnosci");
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map(doc => doc.data());
      setNews(newsList);
    };

    fetchNews();
  }, []);

  const handleProfilePress = () => {
    navigation.navigate('Profile', { user });
  };

  const handlePlanPress = () => {
    navigation.navigate('Plan', { user });
  };

  const handleRejestracjaPress = () => {
    navigation.navigate('Rejestracja', { user });
  };

  const handleOcenyPress = () => {
    navigation.navigate('Oceny', { user });
  };

  const renderFormattedContent = (content) => {
    const lines = content.split('\\n');
    return lines.map((line, index) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      const bulletRegex = /\*(.*?)\*/g;
      const linkRegex = /\\link{(.*?)}/g;

      const formattedLine = line.split(boldRegex).map((part, i) => {
        if (i % 2 === 1) {
          return <Text key={i} style={styles.boldText}>{part}</Text>;
        }
        return part.split(bulletRegex).map((subpart, j) => {
          if (j % 2 === 1) {
            return <Text key={j} style={styles.bulletText}>• {subpart}</Text>;
          }
          return subpart.split(linkRegex).map((linkPart, k) => {
            if (k % 2 === 1) {
              return (
                <Text
                  key={k}
                  style={styles.linkText}
                  onPress={() => Linking.openURL(linkPart)}
                >
                  {linkPart}
                </Text>
              );
            }
            return linkPart;
          });
        });
      });

      return <Text key={index} style={styles.newsContentText}>{formattedLine}</Text>;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Aktualności</Text>
        {news.map((item, index) => (
          <View key={index} style={styles.newsContainer}>
            <View style={styles.newsTitleBox}>
              <Text style={styles.newsTitleText}>{item.tytul}</Text>
            </View>
            <View style={styles.newsContentBox}>
              {renderFormattedContent(item.tresc)}
            </View>
            {index < news.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
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
          <View style={styles.iconBox}>
            <Image
              source={require('../assets/images/Aktualnosci_ON.png')}
              style={styles.iconImage}
            />
          </View>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newsContainer: {
    marginBottom: 20,
  },
  newsTitleBox: {
    borderColor: "#000000",
    borderRadius: 2,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 17,
  },
  newsTitleText: {
    color: "#204C4F",
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsContentBox: {
    borderColor: "#000000",
    borderRadius: 2,
    borderWidth: 1,
    paddingVertical: 21,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  newsContentText: {
    color: "#000000",
    fontSize: 11,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 11,
    color: "#000000",
    marginLeft: 10,
  },
  linkText: {
    color: "#52AF60",
    fontSize: 11,
  },
  separator: {
    height: 1,
    backgroundColor: "#000000",
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

export default AktualnosciScreen;