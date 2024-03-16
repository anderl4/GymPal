import React , { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ImageBackground, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AlertModel from './AlertModel';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from './firebase';
import { showMessage } from 'react-native-flash-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function LogWorkouts() {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const isEmptyField = () => {
    return !workoutDescription || !date;
  };

  const logWorkoutToDB = async (workoutDescription, date) => {
    try {
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      const workoutId = workoutDescription.toLowerCase().replace(/\s/g, '_'); // for now workoutId is just the workoutDescription

      const workoutRef = doc(db, "users", auth.currentUser.uid, "data", "workouts", dateString, workoutId);
  
      // Add the workout data
      await setDoc(workoutRef, {
        workoutDescription: workoutDescription,
        duration: 60, // Placeholder duration in minutes
        date: date,
      }, { merge: true });
    } catch (err) {
      console.log(err);
    }
  }

  const handlePress = () => {
    if (isEmptyField()) {
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
    } else {
      logWorkoutToDB(workoutDescription, date);
      showMessage({
        message: "Workout logged successfully!",
        description: date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}),
        type: "success",
        duration: 3000,
      });
      navigation.goBack(); // or navigate to a specific screen
    }
  };

  function handleDateChange(ev) {
    if (!ev.target['validity'].valid) return;
    const dt = ev.target['value'] + ':00Z';
    setDate(new Date(dt));
  }

  function formatDate() {
    if (!(date instanceof Date)) {
      return null;
    }
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`; 
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.title}>Log a Workout</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Workout Description</Text>
        <TextInput
          style={styles.input}
          value={workoutDescription}
          onChangeText={setWorkoutDescription}
          placeholder="What workout did you do?"
        />

<Text style={styles.label}>Date</Text>
        {Platform.OS === 'web' ? (
            <input
            type="datetime-local"
            style={styles.input}
            defaultValue={formatDate()}
            onChange={handleDateChange}
            ></input>
        ) : (
            <View>
            <Pressable style={styles.button} onPress={showDatePicker}>
            <Text style={styles.buttonText}>Set Date</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={showTimePicker}>
            <Text style={styles.buttonText}>Set Time</Text>
            </Pressable>
            <Text>selected: {date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</Text>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                />
            )}
            </View>
        )}
      </View>

      <View style={styles.createButtonContainer}>
        <Pressable onPress={handlePress}>
          <ImageBackground source={require('./assets/button.png')} style={styles.createButton} resizeMode="contain">
            <Text style={styles.createButtonText}>Submit</Text>
          </ImageBackground>
        </Pressable>
      </View>
      <AlertModel visible={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  form: {
    flex: 1,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#70747E',
    marginTop: 10,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 7.5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  createButtonContainer: {
    paddingHorizontal: 45,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 109,
    height: 31,
  },
  createButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 16.5,
    paddingRight: 25,
  },
  button: {
    backgroundColor: '#FF715B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});
