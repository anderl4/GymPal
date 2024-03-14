import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebase';

export default function SecondScreen() {
  const navigation = useNavigation();

  const fetchDays = () => {
      const currentDate = new Date();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let days = [];
      let daysNum = [];

      for (let i = 0; i <= 4; i++) {
          const date = new Date(currentDate);
          date.setDate(date.getDate() + i);
          days.push(dayNames[date.getDay()]);
          daysNum.push(date.getDate());
      }

      return { days, daysNum };
  };

  const { days, daysNum } = fetchDays();
  const currentDate = new Date().getDate();

  const handlePress = (day, date) => {
    console.log(`${day} ${date}`); // placeholder (maybe we could have a modal popup with their recommendations for the day or something...)
  };

  const handleProfilePress = () => {
    console.log('Profile icon pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.helloAnakin}>Hello, {auth.currentUser.displayName}</Text>
          <Text style={styles.helloAnakinSubtitle}>What did you workout today?</Text>
        </View>

        <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
          <Ionicons name="person-circle-outline" size={32} /> 
        </TouchableOpacity> 
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Create your fitness plan today!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FitnessPlanSetup')}>
          <ImageBackground source={require('./assets/button.png')} style={styles.startButton} resizeMode="contain">
            <Text style={styles.startButtonText}>START</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Image
          source={require('./assets/man.gif')}
          style={styles.weightliftingMan}
        />
      </View>

      <Text style={styles.fitnessActivitiesTitle}>My Fitness Activities</Text>
      <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 20, flexWrap: 'wrap' }}>
          {days.map((day, index) => (
              <TouchableOpacity 
                  key={index} 
                  style={[styles.dayRectangle, daysNum[index] === currentDate && styles.dayRectangleSelected]}
                  onPress={() => handlePress(day, daysNum[index])}
              >
                  <Text style={[styles.dayText, daysNum[index] === currentDate && styles.dayTextSelected]}>{day}</Text>
                  <View style={styles.circle}>
                      <Text style={[styles.dayTextNum, daysNum[index] === currentDate && styles.dayTextNumSelected]}>{daysNum[index]}</Text>
                  </View>
              </TouchableOpacity>
          ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => auth.signOut().then(function() {
        // sign out successful
        console.log("signed out");
      })
      .catch(function(error) {
        // sign out error
        console.error(error);
      })}>
        <Text style={styles.buttonText}>temporary signout button</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  helloAnakin: {
    color: '#060302',
    fontFamily: 'Poppins',
    fontSize: 25,
    fontWeight: '600',
  },
  helloAnakinSubtitle: {
    color: '#70747E',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
  },
  settingsIcon: {
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: '#2F80ED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  loginButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Poppins',
      fontWeight: '600',
  },
  rectangle: {
    width: '90%',
    height: 145,
    backgroundColor: '#7FCDFE',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
    position: 'relative',

    // shadow
    shadowColor: "#501f72",
    shadowOffset: {
      width: 9,
      height: 18,
    },
    shadowOpacity: 0.2,
    shadowRadius: 13,
  },
  rectangleText: {
    color: '#191919',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 140,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 103.83,
    height: 30.79,
    marginTop: 15,
  },
  startButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 11,
    lineHeight: 16.5,
    paddingRight: 45,
  },
  weightliftingMan: {
    position: 'absolute',
    right: 40,
    bottom: 30,
    width: 92, 
    height: 100, 
    paddingLeft: 20,
    marginTop: 50,
    marginLeft: 100,
  },
  workoutQuestion: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  
  rectangleText: {
    color: '#191919',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    width: '60%',
  },
  
  fitnessActivitiesTitle: {
    width: 269,
    height: 29,
    color: '#060302',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    alignSelf: 'flex-start',
    marginLeft: 20, 
    marginTop: 75,
    marginBottom: 10,
  },
  
  dayRectangleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '100%',
  },
  dayRectangle: {
    flexGrow: 1,
    width: 55.45,
    height: 88.806,
    backgroundColor: 'rgba(105, 105, 105, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },

  dayRectangleSelected: {
    flexGrow: 1,
    width: 55.45,
    height: 88.806,
    backgroundColor: '#2F80ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  
  dayText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },

  dayTextSelected: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },

  dayTextNum: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },

  dayTextNumSelected: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#2F80ED',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 26.27,
    height: 26.27,
    borderRadius: 26.27 / 2, 
    backgroundColor: '#FFFFFF', 
    marginTop: 10,
  },
  profileIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});
