import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from '@env';

const WorkoutPage = ({ route }) => {
  const { selectedValue } = route.params;
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
   const fetchExercises = async () => {
     try {
       const headers = {
         'x-api-key': apiKey
       };
       
       const url = `https://api.api-ninjas.com/v1/exercises?${selectedValue}=choice`;
       
       const response = await fetch(url, {
         headers: headers
       });
 
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       
       const data = await response.json();
       setExercises(data);
     } catch (error) {
       console.error('Error fetching exercises:', error);
     }
   };
 
   fetchExercises();
 }, [selectedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.helloAnakin}>Your Workout</Text>
      </View>
      <View style={styles.exercisesContainer}>
        <Text style={styles.fitnessActivitiesTitle}>Exercises for {selectedValue}</Text>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>Type: {exercise.type}</Text>
            <Text style={styles.exerciseDetails}>Equipment: {exercise.equipment}</Text>
            <Text style={styles.exerciseDetails}>Difficulty: {exercise.difficulty}</Text>
            <Text style={styles.exerciseInstructions}>{exercise.instructions}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

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
    marginTop: 10,
    marginBottom: 10,
  },
  exercisesContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  exerciseItem: {
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 16,
    marginBottom: 3,
  },
  exerciseInstructions: {
    fontSize: 14,
  },
});

export default WorkoutPage;
