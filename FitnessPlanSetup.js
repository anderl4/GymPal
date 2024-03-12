import React , { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AlertModel from './AlertModel';

export default function FitnessPlanSetup() {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const isEmptyField = () => {
    return !age || !gender || !weight || !height || !experienceLevel || !activityLevel;
  };

  const handlePress = () => {
    console.log('create plan button pressed');
    if (isEmptyField()) {
      console.log('one or more fields is empty');
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
    } else {
      console.log('all fields filled');
      // TODO: save the plan set up
      navigation.navigate('CreateAccountPage');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Fitness Plan</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={text => setAge(text)}
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={text => setGender(text)}
        />

        <Text style={styles.label}>Weight(kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={text => setWeight(text)}
        />

        <Text style={styles.label}>Height(cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={text => setHeight(text)}
        />

        <Text style={styles.label}>Level of Experience</Text>
        <TextInput
          style={styles.input}
          value={experienceLevel}
          onChangeText={text => setExperienceLevel(text)}
        />

        <Text style={styles.label}>Activity Level</Text>
        <TextInput
          style={styles.input}
          value={activityLevel}
          onChangeText={text => setActivityLevel(text)}
        />
      </View>

      <View style={styles.createButtonContainer}>
        <TouchableOpacity onPress={handlePress}>
          <ImageBackground source={require('./assets/button.png')} style={styles.createButton} resizeMode="contain">
            <Text style={styles.createButtonText}>Create Plan</Text>
          </ImageBackground>
        </TouchableOpacity>
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
});
