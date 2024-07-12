// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTable, addEvent, getEvents } from '../database/database';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    createTable();
    loadEvents();
  }, []);

  const loadEvents = () => {
    getEvents(setEvents);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.date) {
      addEvent(newEvent.title, newEvent.description, newEvent.date);
      setNewEvent({ title: '', description: '', date: '' });
      loadEvents();
    } else {
      Alert.alert('All fields are required');
    }
  };

  const saveEvent = async event => {
    try {
      await AsyncStorage.setItem('currentEvent', JSON.stringify(event));
      navigation.navigate('EventDetails');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={newEvent.title}
        onChangeText={text => setNewEvent({ ...newEvent, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={newEvent.description}
        onChangeText={text => setNewEvent({ ...newEvent, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        value={newEvent.date}
        onChangeText={text => setNewEvent({ ...newEvent, date: text })}
      />
      <Button title="Add Event" onPress={handleAddEvent} />
      <FlatList
        data={events}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Date: {item.date}</Text>
            <Button title="Details" onPress={() => saveEvent(item)} />
          </View>
        )}
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  eventContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
