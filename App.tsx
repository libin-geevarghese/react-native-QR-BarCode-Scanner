import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Scanner from './features/Scanner';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Barcode Scanner App</Text>
      <Scanner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default App;
