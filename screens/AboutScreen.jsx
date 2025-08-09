import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Linking } from 'react-native';

export default function AboutScreen() {
  const scheme = useColorScheme(); 

  const isDark = scheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f9f9f9' }]}>
      <Text style={[styles.title, { color: isDark ? '#A5D6A7' : '#347433' }]}>
        About Deenify
      </Text>

      <Text style={[styles.description, { color: isDark ? '#ccc' : '#555' }]}>
        Deenify helps you discover Quranic ayahs that match your emotions, guiding you towards peace and clarity. You can also chat with the Islamic scholar in the chat section
      </Text>

       <Text style={[styles.description, { color: isDark ? '#ccc' : '#555' }]}>
       For any queries and feedback feel free to reach me out 
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#2E7D32' : '#4CAF50' }]}
          onPress={() => Linking.openURL('http://github.com/Fariss2507')}
        >
          <Text style={styles.buttonText}>GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#0D47A1' : '#1976D2' }]}
          onPress={() => Linking.openURL('https://www.linkedin.com/in/syed-fariss-faheem-197913335/')}
        >
          <Text style={styles.buttonText}>LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15 },
  description: { fontSize: 19, textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  buttonContainer: { flexDirection: 'row', gap: 12 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 4,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
