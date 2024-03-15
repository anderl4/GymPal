import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDoc, doc } from 'firebase/firestore/lite';
import { auth, db } from './firebase';

export default function FitnessPlan() {
  const navigation = useNavigation();
  const [fitnessPlan, setFitnessPlan] = useState(null);

  useEffect(() => {
    const fetchFitnessPlan = async () => {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().fitnessPlanSetup) {
        setFitnessPlan(userDoc.data());
      } else {
        console.log('Fitness plan not found');
        navigation.navigate('FitnessPlanSetup'); 
      }
    };

    fetchFitnessPlan();
  }, []);

  return (
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SecondScreen")}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Your Fitness Plan</Text>
    </View>
      {fitnessPlan ? (
        <View style={styles.content}>
          <View style={styles.contentContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age:</Text>
              <Text style={styles.detailValue}>{fitnessPlan.age}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>{fitnessPlan.gender}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Weight:</Text>
              <Text style={styles.detailValue}>{fitnessPlan.weight} kg</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Height:</Text>
              <Text style={styles.detailValue}>{fitnessPlan.height} cm</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Level of Experience:</Text>
              <Text style={styles.detailValue}>{fitnessPlan.experienceLevel}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Activity Level:</Text>
              <Text style={styles.detailValue}>{fitnessPlan.activityLevel}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.loading}>
          <Text>Loading your fitness plan...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 80,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 50,
    marginTop: 20,
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically align label and value
    marginBottom: 15 
  },
  detailLabel: {
    color: '#060302',
    fontFamily: 'Poppins', 
    fontSize: 16, 
    fontWeight: '500', // Maybe a bit bolder?
    marginRight: 10 
  },
  detailValue: {
    color: '#060302', // Or a slightly subdued color like '#70747E'
    fontFamily: 'Poppins', 
    fontSize: 16 
  },
});
