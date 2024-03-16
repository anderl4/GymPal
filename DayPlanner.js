import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDoc, doc, getDocs, collection, query } from 'firebase/firestore/lite';
import { auth, db } from './firebase';

export default function DayPlanner({ route }) {
  const navigation = useNavigation();
  const { date } = route.params;

  const [waterIntake, setWaterIntake] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const fetchUserData = async () => {
    setIsLoading(true);

    try {
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Fetch water data
      const waterRef = doc(db, "users", auth.currentUser.uid, "data", "hydration", dateString, "water");
      const waterDoc = await getDoc(waterRef);

      if (waterDoc.exists()) {
        setWaterIntake(waterDoc.data().oz);
      } else {
        setWaterIntake(0);
      }

      // Fetch meal data
      const mealsRef = collection(db, "users", auth.currentUser.uid, "data", "meals", dateString);
      const mealsQuery = query(mealsRef);
      const mealsSnapshot = await getDocs(mealsQuery);

      const newMeals = mealsSnapshot.docs.map(doc => ({
        id: doc.id,  // Get the meal ID
        ...doc.data(),  // Extract the mealData
      }));
      setMeals(newMeals);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate("SecondScreen")}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </Pressable>
          <Text style={styles.title}>Day Overview ({formatDate(date)})</Text>
        </View>

        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <View>
            <Text style={styles.detailLabel}>
              You've drank {waterIntake.toFixed(2)} oz of water this day!
            </Text>

            {/* Display meals */}
            {meals.map(meal => (
              <View key={meal.id} style={styles.mealContainer}>
                <Text style={styles.mealText}>
                  {new Date(meal.date.seconds * 1000).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </Text>
                <Text style={styles.mealText}>{meal.mealDescription}</Text>
                <Text style={styles.mealText}>Calories: {meal.calories}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20, // Add padding to create margins
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Add margin bottom to header
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
  loadingText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    marginTop: 20,
  },
  detailLabel: {
    color: '#060302',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  mealContainer: {
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  mealText: {
    color: '#060302',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 5,
  },
});
