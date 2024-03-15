import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView, Pressable } from 'react-native';
import { API_KEY } from '@env';


export default function WorkoutPage({ route }) {
  const { selectedValue } = route.params;

  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (selectedValue === 'type') {
      setOptions(['Cardio','Olympic_weightlifting','Plyometrics','Powerlifting','Strength','Stretching','Strongman']);
    } else if (selectedValue === 'muscle') {
      setOptions(['Abdominals','Abductors','Adductors','Biceps','Calves','Chest','Forearms','Glutes','Hamstrings','Lats','Lower_back','Middle_back','Neck','Quadriceps','Traps','Triceps']);
    } else if (selectedValue === 'difficulty') {
      setOptions(['Beginner', 'Intermediate', 'Advanced']);
    }
  }, [selectedValue]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const request = require('request');
        var option = selectedOption.toLowerCase(); // Use selectedOption instead of a fixed value

        request.get({
          url: `https://api.api-ninjas.com/v1/exercises?${selectedValue}=` + option,
          headers: {
            'X-Api-Key': API_KEY
          },
        }, function (error, response, body) {
          if (error) return console.error('Request failed:', error);
          else if (response.statusCode !== 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
          else console.log(body)
        });

      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [selectedValue, selectedOption]); // Add selectedOption to dependencies

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('FitnessPlan')}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.title}>Your Workout Recommendation</Text>
      </View>

      <Text style={styles.fitnessActivitiesTitle}>Select your {selectedValue}</Text>
      <Picker
        selectedValue={selectedOption}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}>
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontFamily: 'Poppins',
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  fitnessActivitiesTitle: {
    color: '#060302',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 75,
    marginBottom: 10,
  },
});
