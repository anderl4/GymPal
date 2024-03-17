import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfilePage() {
   const navigation = useNavigation();

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
               <Text style={styles.backButtonText}>{"<"}</Text>
            </Pressable>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.signOutContainer}>
               <Pressable style={styles.signOutButton} onPress={() => auth.signOut().then(function() {
                  // sign out successful
                  console.log("signed out");
               })
               .catch(function(error) {
                  // sign out error
                  console.error(error);
               })}>
                  <Text style={styles.signOutButtonText}>Sign Out</Text>
               </Pressable>
            </View>
         </View>
      </View>
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
    marginRight: 10,
  },
  backButtonText: {
    fontFamily: 'Poppins',
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
  },
  title: {
    flex: 1, // Takes remaining space
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  signOutContainer: {
    marginLeft: 'auto', // Moves the container to the right
  },
  signOutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});
