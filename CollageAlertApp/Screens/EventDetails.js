// screens/EventDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventDetailsScreen = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventData = await AsyncStorage.getItem('currentEvent');
        if (eventData) {
          setEvent(JSON.parse(eventData));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadEvent();
  }, []);

  return (
    <View style={styles.container}>
      {event ? (
        <>
          <Text style={styles.title}>{event.title}</Text>
          <Text>{event.description}</Text>
          <Text>Date: {event.date}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default EventDetailsScreen;
