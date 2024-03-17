import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Scanner from './features/Scanner';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Scanner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ebe7',
  },
});

export default App;
