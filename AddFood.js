import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ImageBackground, ScrollView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AlertModel from './AlertModel';
import { setDoc, doc } from 'firebase/firestore/lite';
import { auth, db } from './firebase';
import { showMessage } from 'react-native-flash-message';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LogMeals() {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const isEmptyField = () => {
    return !mealDescription || !date;
  };

  const logMealToDB = async (mealDescription, date) => {
    try {
        //idk if this is how you log it 
      await setDoc(doc(db, "meals", auth.currentUser.uid), {
        mealDescription: mealDescription,
        date: date.toISOString(),
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
      logMealToDB(mealDescription, date);
      showMessage({
        message: "Meal logged successfully!",
        description: date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}),
        type: "success",
        duration: 3000,
      });
      navigation.goBack(); // or navigate to a specific screen
    }
  };

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
        <Text style={styles.title}>Log a Meal</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Meal Description</Text>
        <TextInput
          style={styles.input}
          value={mealDescription}
          onChangeText={setMealDescription}
          placeholder="What did you eat?"
        />

        <Text style={styles.label}>Date & Time</Text>
        <View>
          <Pressable style={styles.button} onPress={showDatePicker}>
            <Text style={styles.buttonText}>Set Date</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={showTimePicker}>
            <Text style={styles.buttonText}>Set Time</Text>
          </Pressable>
          <Text>Selected: {date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
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
