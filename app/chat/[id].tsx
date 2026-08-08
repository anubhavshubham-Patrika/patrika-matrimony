import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity,
  SafeAreaView, Image, KeyboardAvoidingView, Platform, StatusBar, ScrollView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import chatsData from '../../src/data/chats.json';
import profilesData from '../../src/data/profiles.json';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import PremiumButton from '../../src/components/ui/PremiumButton';

interface Message {
  chatId: string;
  fromProfileId: string;
  text: string;
  timestamp: string;
  readStatus: boolean;
}

export default function ChatDetailScreen() {
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
      setMessages([]);
    }
  }, [id]);

  const sendMessage = (text: string = inputText) => {
    if (!text.trim()) return;
    const newMsg: Message = {
      chatId: `MSG_${Date.now()}`,
      fromProfileId: myProfileId,
      text: text.trim(),
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
            source={{ uri: otherProfile?.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.avatarSmall}
          />
        )}
        <View style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.bubbleText, isMine && styles.myBubbleText]}>{item.text}</Text>
          <View style={styles.bubbleMeta}>
            <Text style={[styles.timeText, isMine && styles.myTimeText]}>{formatTime(item.timestamp)}</Text>
            {isMine && (
              <Ionicons
                name={item.readStatus ? 'checkmark-done' : 'checkmark'}
                size={14}
                color={item.readStatus ? Colors.gold : Colors.textMuted}
                style={{ marginLeft: 4 }}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const isPaidUser = state.currentPlan !== 'Free';

  const icebreakers = [
    "Hello! I liked your profile.",
    "Hi, would you like to connect?",
    "Namaste! Your interests align with mine."
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.surface} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerProfile} onPress={() => router.push(`/profile/${otherProfileId}`)}>
          <Image
            source={{ uri: otherProfile?.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.headerAvatar}
          />
          <View style={styles.headerTextCol}>
            <Text style={styles.headerName}>{otherProfile?.name || 'Profile'}</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="videocam-outline" size={22} color={Colors.surface} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="call-outline" size={22} color={Colors.surface} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Secure Notice */}
      <View style={styles.secureBanner}>
        <Ionicons name="shield-checkmark" size={16} color={Colors.gold} />
        <Text style={styles.secureBannerText}>Premium Secure Chat • Contact info is private</Text>
      </View>

      {/* Chat Area */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.chatId}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Image
              source={{ uri: otherProfile?.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.emptyAvatar}
            />
            <Text style={styles.emptyTitle}>You matched with {otherProfile?.name}!</Text>
            <Text style={styles.emptySub}>Don't be shy, say hi with an icebreaker.</Text>
            
            <View style={styles.icebreakerContainer}>
              {icebreakers.map((msg, idx) => (
                <TouchableOpacity key={idx} style={styles.icebreakerChip} onPress={() => sendMessage(msg)}>
                  <Text style={styles.icebreakerText}>{msg}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />

      {/* Input Area */}
      {isPaidUser ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachBtn}>
              <Ionicons name="add-circle-outline" size={28} color={Colors.primary} />
            </TouchableOpacity>
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                placeholderTextColor={Colors.textMuted}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]} 
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <Ionicons name="send" size={18} color={Colors.surface} style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.upgradeContainer}>
          <View style={styles.upgradeTextRow}>
            <Ionicons name="lock-closed" size={18} color={Colors.gold} />
            <Text style={styles.upgradeText}>Upgrade to Premium to message directly</Text>
          </View>
          <PremiumButton
            title="View Premium Plans"
            onPress={() => router.push('/subscription')}
            variant="premium"
            icon="star"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  header: {
    backgroundColor: Colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  backBtn: { 
    padding: Spacing.sm,
  },
  headerProfile: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  headerAvatar: { 
    width: 44, 
    height: 44, 
    borderRadius: BorderRadius.full, 
    borderWidth: 2, 
    borderColor: Colors.gold 
  },
  headerTextCol: {
    justifyContent: 'center',
  },
  headerName: { 
    color: Colors.surface, 
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.sizes.lg,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  headerStatus: { 
    color: Colors.secondaryLight, 
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sansMedium,
  },
  headerActions: { 
    flexDirection: 'row', 
    gap: Spacing.xs 
  },
  headerIcon: { 
    padding: Spacing.sm 
  },
  secureBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceWarm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.xs,
  },
  secureBannerText: { 
    fontSize: Typography.sizes.xs, 
    color: Colors.primary, 
    fontFamily: Typography.fontFamily.sansMedium 
  },
  messagesList: { 
    padding: Spacing.lg, 
    paddingBottom: Spacing.xl,
  },
  messagRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  myRow: { 
    flexDirection: 'row-reverse' 
  },
  avatarSmall: { 
    width: 32, 
    height: 32, 
    borderRadius: BorderRadius.full 
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: BorderRadius['2xl'],
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...Shadow.sm,
  },
  myBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: BorderRadius.sm,
  },
  theirBubble: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: BorderRadius.sm,
  },
  bubbleText: { 
    fontSize: Typography.sizes.md, 
    color: Colors.text, 
    fontFamily: Typography.fontFamily.sans,
    lineHeight: 22,
  },
  myBubbleText: { 
    color: Colors.surface 
  },
  bubbleMeta: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    marginTop: Spacing.xs 
  },
  timeText: { 
    fontSize: 11, 
    color: Colors.textMuted,
    fontFamily: Typography.fontFamily.sans,
  },
  myTimeText: { 
    color: Colors.secondaryLight 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 30 : Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  attachBtn: { 
    paddingBottom: Spacing.xs,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  input: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    maxHeight: 120,
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.text,
  },
  sendBtn: {
    backgroundColor: Colors.primary,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    ...Shadow.sm,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.textMuted,
    shadowOpacity: 0,
  },
  upgradeContainer: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.md,
    ...Shadow.md,
  },
  upgradeTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  upgradeText: { 
    fontSize: Typography.sizes.md, 
    color: Colors.primaryDark, 
    fontFamily: Typography.fontFamily.sansMedium 
  },
  
  // Empty State & Icebreakers
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyAvatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
    marginBottom: Spacing.xs,
  },
  emptySub: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontFamily: Typography.fontFamily.sans,
    marginBottom: Spacing.xl,
  },
  icebreakerContainer: {
    width: '100%',
    gap: Spacing.sm,
  },
  icebreakerChip: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.pill,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  icebreakerText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.primary,
  }
});
