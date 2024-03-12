import React , { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AlertModel from './AlertModel';

export default function LoginPage() {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmptyField = () => {
    return !usernameEmail || !password;
  };

  const handlePress = () => {
    console.log('log in button pressed');
    if (isEmptyField()) {
      console.log('one or more fields is empty');
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
    } else if (pass) {
      // check if detials are valid
    } else {
      console.log('all fields filled');
      // TODO: save the account
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sign In</Text>
      </View>

      <View style={styles.form}>
      <Text style={styles.label}>Username or Email</Text>
        <TextInput
          style={styles.input}
          value={usernameEmail}
          onChangeText={text => setUsernameEmail(text)}
        />

      <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      

      <View style={styles.createButtonContainer}>
        <TouchableOpacity onPress={handlePress}>
          <ImageBackground source={require('./assets/button.png')} style={styles.createButton} resizeMode="contain">
            <Text style={styles.createButtonText}>Sign In</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.signupSection}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
          <Text style={styles.signupLink}>Get Started Now!</Text>
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
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  signupText: {
    fontFamily: 'Poppins',
  },
  signupLink: {
    color: '#FF715B',
    fontFamily: 'Poppins',
    textDecorationLine: 'underline'
  }
});
