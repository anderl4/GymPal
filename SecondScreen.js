import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function SecondScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.helloAnakin}>Hello, Anakin</Text>
        <TouchableOpacity style={styles.settingsIcon}>
          <Image source={require('./assets/setting.png')} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Create your fitness plan today!</Text>
        <ImageBackground source={require('./assets/button.png')} style={styles.startButton} resizeMode="contain">
          <Text style={styles.startButtonText}>START</Text>
        </ImageBackground>
        <Image
          source={require('./assets/man.gif')}
          style={styles.weightliftingMan}
        />
      </View>
      <Text style={styles.fitnessActivitiesTitle}>My Fitness Activities</Text>
      <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 20, flexWrap: 'wrap' }}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayRectangle}>
            <Text style={styles.dayText}>{day}</Text>
            <View style={styles.circle}></View>
          </View>
        ))}
      </View>
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
  settingsIcon: {
    width: 24,
    height: 24,
  },
  rectangle: {
    width: 340,
    height: 155,
    backgroundColor: '#7FCDFE',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
    position: 'relative',
  },
  rectangleText: {
    color: '#191919',
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 140,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    marginTop: 5,
  },
  startButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 11,
    fontWeight: '600',
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
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    width: '60%',
  },
  
  fitnessActivitiesTitle: {
    width: 269,
    height: 29,
    color: '#060302',
    fontFamily: 'DM Sans',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    alignSelf: 'flex-start',
    marginLeft: 20, 
    marginTop: 20,
    marginBottom: -10,
  },
  
  dayRectangleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '100%',
  },
  dayRectangle: {
    flexGrow: 1,
    height: 88.806,
    backgroundColor: 'rgba(105, 105, 105, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  
  dayText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  
  circle: {
    width: 26.27,
    height: 26.27,
    borderRadius: 26.27 / 2, 
    backgroundColor: '#FFFFFF', 
    marginTop: 10,
  },
});
