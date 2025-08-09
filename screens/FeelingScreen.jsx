import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { emotionsData } from '../data/emotions';

const remoteImage = { uri: 'https://cdn2.f-cdn.com/contestentries/1516543/29341127/5d03c7844fd09_thumbCard.jpg' };

export default function FeelingScreen() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
  };

  const handleBack = () => {
    setSelected(null);
  };

  return (
    <ImageBackground source={remoteImage} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {!selected && (
            <>
              <Text style={styles.heading}>How are you feeling today?</Text>
              <View style={styles.grid}>
                {emotionsData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    activeOpacity={0.85}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.emoji}>{item.emoji}</Text>
                    <Text style={styles.label}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {selected && (
            <View style={styles.ayahBox}>
              <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
              {/* <Text>You are feeling {emotion}</Text> */}
              <Text style={styles.subHeading}>Here’s what Allah says in the Quran:</Text>
              {selected.ayahs.map((a, i) => (
                <View key={i} style={styles.ayahItem}>
                  <Text style={styles.arabic}>{a.ar}</Text>
                  <Text style={styles.english}>"{a.en}"</Text>
                  <Text style={styles.ref}>{a.ref}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 27, 42, 0.85)',
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0E1DD',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E0E1DD',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
  backgroundColor: 'rgba(65, 90, 119, 0.9)',
  width: '47%',
  borderRadius: 18,
  paddingVertical: 25,
  paddingHorizontal: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  elevation: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  borderWidth: 1,
  borderColor: 'rgba(224, 225, 221, 0.2)',
  flexDirection: 'column', 
},

emoji: {
  fontSize: 34,
  marginBottom: 8, 
},

label: {
  fontSize: 22,       
  fontWeight: '600',
  color: '#E0E1DD',
  letterSpacing: 0.5,
  textAlign: 'center',
},
  ayahBox: {
    marginTop: 20,
    backgroundColor: 'rgba(27, 38, 59, 0.95)',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(224, 225, 221, 0.1)',
  },
  ayahItem: {
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(224, 225, 221, 0.2)',
    paddingBottom: 10,
  },
  arabic: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#E0E1DD',
  },
  english: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#E0E1DD',
    marginVertical: 5,
  },
  ref: {
    fontSize: 14,
    textAlign: 'right',
    color: '#A9A9A9',
  },
  backBtn: {
    marginBottom: 15,
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(65,90,119,0.7)',
    borderRadius: 8,
  },
  backText: {
    color: '#E0E1DD',
    fontSize: 14,
    fontWeight: '600',
  },
});
