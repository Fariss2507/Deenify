import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';

const reciters = [
  { id: 1, name: 'Mishary Rashid', identifier: 'ar.alafasy' },
  { id: 2, name: 'Abdul Basit', identifier: 'ar.abdulbasitmurattal' },
  { id: 3, name: 'Saad Al-Ghamdi', identifier: 'ar.saoodshuraim' },
];

export default function RecitationScreen() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState(reciters[0]);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false); 

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then(res => {
        setSurahs(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playAudio = (surahNumber) => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    setAudioLoading(true); 

    const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter.identifier}/${surahNumber}.mp3`;

    const newSound = new Sound(audioUrl, null, (error) => {
      if (error) {
        console.log('Error loading audio:', error);
        setAudioLoading(false);
        return;
      }
      setAudioLoading(false); 
      newSound.play(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    });

    setSound(newSound);
  };

  const stopAudio = () => {
    if (sound) {
      sound.stop(() => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quran Recitation</Text>

      <Text style={styles.infoText}>
        Just press once and wait for a few seconds :)
      </Text>

     
      <View style={styles.reciterContainer}>
        {reciters.map(r => (
          <TouchableOpacity
            key={r.id}
            style={[
              styles.reciterButton,
              selectedReciter.id === r.id && styles.activeReciter
            ]}
            onPress={() => setSelectedReciter(r)}
          >
            <Text style={styles.reciterText}>{r.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {isPlaying && (
        <TouchableOpacity style={styles.stopButton} onPress={stopAudio}>
          <Text style={styles.stopButtonText}>Stop Recitation</Text>
        </TouchableOpacity>
      )}

  
      {audioLoading && (
        <ActivityIndicator size="large" color="#45A29E" style={{ marginBottom: 10 }} />
      )}

    
      {loading ? (
        <ActivityIndicator size="large" color="#6CA6CD" />
      ) : (
        <FlatList
          data={surahs}
          keyExtractor={item => item.number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.surahItem}
              onPress={() => playAudio(item.number)}
            >
              <Text style={styles.surahText}>{item.number}. {item.englishName}</Text>
              <Text style={styles.surahSub}>{item.englishNameTranslation}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#66FCF1',
    textAlign: 'center',
    marginTop: 15,
  },
  infoText: {
    color: '#C5C6C7',
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  reciterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  reciterButton: {
    backgroundColor: '#1F2833',
    padding: 8,
    margin: 5,
    borderRadius: 8,
  },
  activeReciter: {
    backgroundColor: '#45A29E',
  },
  reciterText: {
    color: '#C5C6C7',
  },
  stopButton: {
    backgroundColor: '#D72638',
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  stopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  surahItem: {
    backgroundColor: '#1F2833',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  surahText: {
    color: '#66FCF1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  surahSub: {
    color: '#C5C6C7',
    fontSize: 13,
  },
});
