import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About the App</Text>
      <Text style={styles.subText}>
        This app provides Quranic guidance based on your emotions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  text: { fontSize: 22, fontWeight: 'bold', color: '#347433', marginBottom: 10 },
  subText: { fontSize: 16, textAlign: 'center', color: '#555' }
});
