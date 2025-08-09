import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { OPENROUTER_API_KEY } from '@env';

const ChatScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const isDark = useColorScheme() === 'dark';

  const sendToAI = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are an Islamic scholar AI. You must ONLY answer Islamic-related questions (Quran, Hadith, Islamic history, Fiqh, Islamic guidance). If the question is unrelated to Islam, respond with: "I can only assist you with Islamic-related questions.". Also reply on hey and hi as "assalam o alaikum." Always provide answers based on authentic sources.',
            },
            ...updatedMessages.map((m) => ({ role: m.role, content: m.text })),
          ],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(`API Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      const botText =
        data?.choices?.[0]?.message?.content ||
        'No response from AI. Check API response structure.';

      const botMessage = { role: 'assistant', text: botText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('API Error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `⚠️ Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: isDark ? '#0A0F1E' : '#f4f4f4' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
    
        <Text
          style={[
            styles.heading,
            { color: isDark ? '#4FC3F7' : '#0A0F1E' },
          ]}
        >
          Ask the Islamic Scholar
        </Text>

       
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(255,255,255,0.9)',
            },
          ]}
        >
          <TextInput
            style={[styles.input, { color: isDark ? '#fff' : '#000' }]}
            placeholder="Type your Islamic question..."
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}  onPress={sendToAI}>
            {/* <Text>Send </Text> */}
            <Ionicons name="Send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

     
        <ScrollView
          style={styles.chatBox}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.role === 'user'
                  ? styles.userBubble
                  : styles.botBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  { color: msg.role === 'user' ? '#fff' : '#222' },
                ]}
              >
                {msg.text}
              </Text>
            </View>
          ))}

          {loading && (
            <ActivityIndicator size="large" color="#4FC3F7" style={{ marginTop: 10 }} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 12,
    letterSpacing: 0.5,
  },
  chatBox: {
    flex: 1,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4FC3F7',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4FC3F7',
    padding: 10,
    borderRadius: 50,
    marginLeft: 6,
  },
});
