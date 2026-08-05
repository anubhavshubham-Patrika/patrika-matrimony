import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity,
  SafeAreaView, Image, KeyboardAvoidingView, Platform, StatusBar
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import chatsData from '../../src/data/chats.json';
import profilesData from '../../src/data/profiles.json';

const PRIMARY = '#6B0000';

interface Message {
  chatId: string;
  fromProfileId: string;
  text: string;
  timestamp: string;
  readStatus: boolean;
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { state } = useApp();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const conversation = (chatsData as any[]).find((c: any) => c.conversationId === id);
  const myProfileId = state.currentUser?.profileId || 'P001';
  const otherProfileId = conversation?.participants?.find((p: string) => p !== myProfileId) || 'P002';
  const otherProfile = (profilesData as any[]).find((p: any) => p.profileId === otherProfileId);

  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    } else {
      setMessages([
        {
          chatId: 'MSG_INIT',
          fromProfileId: otherProfileId,
          text: `Namaste! I saw your profile and would love to connect.`,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          readStatus: true,
        },
      ]);
    }
  }, [id]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      chatId: `MSG_${Date.now()}`,
      fromProfileId: myProfileId,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      readStatus: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMine = item.fromProfileId === myProfileId;
    return (
      <View style={[styles.messagRow, isMine && styles.myRow]}>
        {!isMine && (
          <Image
            source={{ uri: otherProfile?.profilePhotoURL || 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.avatarSmall}
          />
        )}
        <View style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.bubbleText, isMine && styles.myBubbleText]}>{item.text}</Text>
          <View style={styles.bubbleMeta}>
            <Text style={[styles.timeText, isMine && styles.myTimeText]}>{formatTime(item.timestamp)}</Text>
            {isMine && (
              <MaterialCommunityIcons
                name={item.readStatus ? 'check-all' : 'check'}
                size={12}
                color={item.readStatus ? '#FCD04B' : 'rgba(255,253,249,0.7)'}
                style={{ marginLeft: 3 }}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const isPaidUser = state.currentPlan !== 'Free';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFDF9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerProfile} onPress={() => router.push(`/profile/${otherProfileId}`)}>
          <Image
            source={{ uri: otherProfile?.profilePhotoURL || 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerName}>{otherProfile?.name || 'Profile'}</Text>
            <Text style={styles.headerStatus}>🟢 Online</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="videocam-outline" size={22} color="#FFFDF9" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="call-outline" size={22} color="#FFFDF9" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Secure call notice */}
      <View style={styles.secureBanner}>
        <MaterialCommunityIcons name="shield-check" size={14} color="#786C10" />
        <Text style={styles.secureBannerText}>Royal Secure Chat • Mobile number is private</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.chatId}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Input */}
      {isPaidUser ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtn}>
              <MaterialCommunityIcons name="attachment" size={22} color="#8C7B6B" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              placeholderTextColor="#8C7B6B"
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Ionicons name="send" size={18} color="#FFFDF9" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.upgradeBar}>
          <MaterialCommunityIcons name="lock" size={18} color={PRIMARY} />
          <Text style={styles.upgradeText}>Upgrade to Rajgharana Gold to send messages</Text>
          <TouchableOpacity onPress={() => router.push('/subscription')} style={styles.upgradeBtn}>
            <Text style={styles.upgradeBtnText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6F0' },
  header: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  backBtn: { padding: 4, marginRight: 8 },
  headerProfile: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#FCD04B' },
  headerName: { color: '#FFFDF9', fontWeight: '800', fontSize: 16 },
  headerStatus: { color: '#E5B869', fontSize: 12, marginTop: 1 },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerIcon: { padding: 6 },
  secureBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9E6',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D7C7',
    paddingVertical: 6,
    gap: 5,
  },
  secureBannerText: { fontSize: 12, color: '#786C10', fontWeight: '700' },
  messagesList: { padding: 12, paddingBottom: 8 },
  messagRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    gap: 8,
  },
  myRow: { flexDirection: 'row-reverse' },
  avatarSmall: { width: 28, height: 28, borderRadius: 14 },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  myBubble: {
    backgroundColor: PRIMARY,
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, color: '#200D08', lineHeight: 20 },
  myBubbleText: { color: '#FFFDF9' },
  bubbleMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 3 },
  timeText: { fontSize: 10, color: '#8C7B6B' },
  myTimeText: { color: 'rgba(255,253,249,0.7)' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFDF9',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2D7C7',
    gap: 8,
  },
  attachBtn: { padding: 6 },
  input: {
    flex: 1,
    backgroundColor: '#F4EEE5',
    borderWidth: 1,
    borderColor: '#E8DFD3',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
    color: '#200D08',
  },
  sendBtn: {
    backgroundColor: PRIMARY,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2D7C7',
    gap: 8,
  },
  upgradeText: { flex: 1, fontSize: 13, color: '#200D08' },
  upgradeBtn: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },
  upgradeBtnText: { color: '#FFFDF9', fontWeight: '700', fontSize: 13 },
});
