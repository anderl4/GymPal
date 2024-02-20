import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SecondScreen from './SecondScreen'; 

export default function App() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('./assets/dumbbell.png')} style={styles.dumbbellImage} />
      <Text style={styles.gymPalText}>Gym Pal</Text>
      <Text style={styles.simplifyText}>Simplify the Path to a Healthy Life</Text>
      <Image source={require('./assets/gymbro.png')} style={styles.gymBro} />
      <View style={styles.lowerSection}>
        <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('SecondScreen')}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FCDFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dumbbellImage: {
    width: 45,
    height: 45,
    marginBottom: 1,
    marginTop: 100
  },
  gymPalText: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
  },
  simplifyText: {
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginTop: 17,
  },
  gymBro: {
    width: 430,
    height: 290,
    marginTop: 90,
  },
  lowerSection: {
    width: '100%', 
    flex: 1, 
    backgroundColor: '#79B3E1',
    alignItems: 'center', 
    paddingTop: 20,
  },
  getStartedButton: {
    width: 301,
    height: 56,
    backgroundColor: '#FF715B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 28,
  },
  getStartedButtonText: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    fontWeight: '700',
  },
});