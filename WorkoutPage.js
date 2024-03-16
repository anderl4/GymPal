import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView, Pressable } from 'react-native';
import { API_KEY } from '@env';


export default function WorkoutPage({ route }) {
  const { selectedValue } = route.params;

  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    if (selectedValue === 'type') {
      setOptions(['Cardio','Olympic_weightlifting','Plyometrics','Powerlifting','Strength','Stretching','Strongman']);
    } else if (selectedValue === 'muscle') {
      setOptions(['Abdominals','Abductors','Adductors','Biceps','Calves','Chest','Forearms','Glutes','Hamstrings','Lats','Lower_back','Middle_back','Neck','Quadriceps','Traps','Triceps']);
    } else if (selectedValue === 'difficulty') {
      setOptions(['Beginner', 'Intermediate', 'Advanced']);
    }

    // Call the API with default selected option when the component mounts
    handleOptionChange(selectedOption);
  }, [selectedValue]);

  const handleOptionChange = (itemValue, itemIndex) => {
    setSelectedOption(itemValue);
    console.log('Selected option:', itemValue);

    fetch(`https://api.api-ninjas.com/v1/exercises?${selectedValue}=${itemValue}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY
    },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setExerciseData(data);
    })
    .catch(error => {
      console.error('Request failed:', error);
    });
  };

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
        onValueChange={handleOptionChange}>
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>

      {exerciseData && (
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Exercise Recommendations:</Text>
        {exerciseData.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text>Type: {exercise.type}</Text>
            <Text>Muscle: {exercise.muscle}</Text>
            <Text>Equipment: {exercise.equipment}</Text>
            <Text>Difficulty: {exercise.difficulty}</Text>
            <Text style={styles.instructions}>{exercise.instructions}</Text>
          </View>
        ))}
      </View>
    )}
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
  picker: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
  },
  exerciseContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  exerciseCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc', // Optional: Add border color for a cleaner look
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instructions: {
    marginTop: 5,
  },
});
