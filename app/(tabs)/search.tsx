import React, { useState, useMemo, useRef } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, 
  Modal, ScrollView, SafeAreaView, Platform, Image, Dimensions, Animated, PanResponder 
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import ProfileCard from '../../src/components/ProfileCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SearchScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  // Mode: 'swipe' (Match Deck) or 'list' (Filterable List)
  const [viewMode, setViewMode] = useState<'swipe' | 'list'>('swipe');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Best Match');

  // Swipe Deck state
  const [cardIndex, setCardIndex] = useState(0);
  const [historyStack, setHistoryStack] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Animated position for swipe gesture
  const position = useRef(new Animated.ValueXY()).current;

  const isShortlisted = (id: string) => state.shortlistedProfiles.includes(id);
  const isInterestSent = (id: string) => state.sentInterests.includes(id);

  const chips = ['All', 'Nearby', 'New', 'Verified', 'Newspaper Ad'];

  const [filters, setFilters] = useState<Record<string, string[]>>({
    types: [], onlineStatus: [], activity: [], postedBy: [],
    religion: [], motherTongue: [], caste: [], location: [],
    income: [], employment: [], education: [], occupation: [],
    photo: [], diet: [], maritalStatus: [], manglik: []
  });

  const activeFiltersCount = Object.values(filters).reduce((acc, val) => 
    acc + (Array.isArray(val) ? val.length : val ? 1 : 0), 0
  );

  const filteredProfiles = useMemo(() => {
    let result = profiles;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.caste && p.caste.toLowerCase().includes(q)) || 
        (p.occupation && p.occupation.toLowerCase().includes(q)) || 
        (p.residentCity && p.residentCity.toLowerCase().includes(q))
      );
    }
    if (activeChip !== 'All') {
      if (activeChip === 'Verified') result = result.filter(p => p.isVerified);
      if (activeChip === 'Newspaper Ad') result = result.filter(p => p.isNewspaperAdLinked);
    }
    return result;
  }, [profiles, searchQuery, activeChip]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleNextCard = (action?: 'interest' | 'shortlist' | 'skip') => {
    if (cardIndex >= filteredProfiles.length) return;
    const currentProfile = filteredProfiles[cardIndex];

    if (action === 'interest') {
      dispatch({ type: 'SEND_INTEREST', payload: currentProfile.profileId });
      showToast(`Interest Sent to ${currentProfile.name.split(' ')[0]} 💕`);
    } else if (action === 'shortlist') {
      dispatch({ type: 'TOGGLE_SHORTLIST', payload: currentProfile.profileId });
      showToast(`Added ${currentProfile.name.split(' ')[0]} to Shortlist ⭐`);
    } else if (action === 'skip') {
      showToast(`Passed ${currentProfile.name.split(' ')[0]}`);
    }

    setHistoryStack(prev => [...prev, cardIndex]);
    setCardIndex(prev => prev + 1);
  };

  const handleUndoCard = () => {
    if (historyStack.length === 0) return;
    const lastIndex = historyStack[historyStack.length - 1];
    setHistoryStack(prev => prev.slice(0, prev.length - 1));
    setCardIndex(lastIndex);
    showToast('Brought back previous card 🔄');
  };

  // PanResponder for touch drag & swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          // Swiped Right -> Interested
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 });
            handleNextCard('interest');
          });
        } else if (gestureState.dx < -120) {
          // Swiped Left -> Skip / Pass
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 });
            handleNextCard('skip');
          });
        } else if (gestureState.dy < -120) {
          // Swiped Up -> Shortlist
          Animated.timing(position, {
            toValue: { x: gestureState.dx, y: -600 },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 });
            handleNextCard('shortlist');
          });
        } else {
          // Snap back to center
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 6,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // Rotation and Stamp Opacities
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  const rotateAndTranslate = {
    transform: [
      { rotate },
      ...position.getTranslateTransform(),
    ],
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [10, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const starOpacity = position.y.interpolate({
    inputRange: [-120, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const currentProfile = filteredProfiles[cardIndex];
  const nextProfile = filteredProfiles[cardIndex + 1];

  const renderFilterSection = (title: string, options: string[], filterKey: string) => {
    return (
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>{title}</Text>
        <View style={styles.filterOptions}>
          {options.map(opt => {
            const isSelected = filters[filterKey].includes(opt);
            return (
              <TouchableOpacity 
                key={opt}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => {
                  const curr = filters[filterKey];
                  setFilters({
                    ...filters,
                    [filterKey]: isSelected ? curr.filter(x => x !== opt) : [...curr, opt]
                  });
                }}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header & Search Bar */}
      <View style={styles.header}>
        <View style={styles.topBarRow}>
          <Text style={styles.headerBrandTitle}>Match Discovery</Text>
          
          {/* Mode Switcher Buttons */}
          <View style={styles.modeSwitcher}>
            <TouchableOpacity 
              style={[styles.modeTabBtn, viewMode === 'swipe' && styles.modeTabBtnActive]}
              onPress={() => setViewMode('swipe')}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons 
                name="cards" 
                size={18} 
                color={viewMode === 'swipe' ? '#FFFFFF' : '#8C7A7C'} 
              />
              <Text style={[styles.modeTabText, viewMode === 'swipe' && styles.modeTabTextActive]}>
                Match Deck
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modeTabBtn, viewMode === 'list' && styles.modeTabBtnActive]}
              onPress={() => setViewMode('list')}
              activeOpacity={0.85}
            >
              <Ionicons 
                name="list" 
                size={18} 
                color={viewMode === 'list' ? '#FFFFFF' : '#8C7A7C'} 
              />
              <Text style={[styles.modeTabText, viewMode === 'list' && styles.modeTabTextActive]}>
                List View
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#8C7A7C" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search by name, caste, city..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8C7A7C"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#8C7A7C" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setIsFilterVisible(true)}>
            <Ionicons name="options-outline" size={22} color="#E91E63" />
            {activeFiltersCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Quick Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chipsContainer}>
          {chips.map(chip => (
            <TouchableOpacity 
              key={chip} 
              style={[styles.quickChip, activeChip === chip && styles.quickChipActive]}
              onPress={() => {
                setActiveChip(chip);
                setCardIndex(0);
              }}
            >
              <Text style={[styles.quickChipText, activeChip === chip && styles.quickChipTextActive]}>
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* VIEW MODE 1: SWIPE MATCH DECK */}
      {viewMode === 'swipe' ? (
        <View style={styles.swipeDeckArea}>
          {/* Swipe Tip Hint Banner */}
          <View style={styles.swipeTipBanner}>
            <Ionicons name="swap-horizontal" size={14} color="#E91E63" />
            <Text style={styles.swipeTipText}>👈 Swipe Left to Pass • Swipe Right to Express Interest 👉</Text>
          </View>

          {currentProfile ? (
            <View style={styles.cardStackContainer}>
              {/* Underneath Card Preview (3D depth stack effect) */}
              {nextProfile && (
                <View style={styles.underCardPreview}>
                  <Image source={{ uri: nextProfile.profilePhotoURL }} style={styles.underCardImage} />
                </View>
              )}

              {/* Main Swipable Card */}
              <Animated.View 
                {...panResponder.panHandlers}
                style={[styles.mainCard, rotateAndTranslate]}
              >
                <Image source={{ uri: currentProfile.profilePhotoURL }} style={styles.cardMainPhoto} />

                {/* LIKE STAMP OVERLAY */}
                <Animated.View style={[styles.stampContainer, styles.likeStampContainer, { opacity: likeOpacity }]}>
                  <Text style={styles.likeStampText}>INTERESTED 💕</Text>
                </Animated.View>

                {/* PASS STAMP OVERLAY */}
                <Animated.View style={[styles.stampContainer, styles.passStampContainer, { opacity: passOpacity }]}>
                  <Text style={styles.passStampText}>PASSED ✕</Text>
                </Animated.View>

                {/* SHORTLIST STAMP OVERLAY */}
                <Animated.View style={[styles.stampContainer, styles.starStampContainer, { opacity: starOpacity }]}>
                  <Text style={styles.starStampText}>SHORTLISTED ⭐</Text>
                </Animated.View>

                {/* Top Overlay Badges */}
                <View style={styles.cardTopBadgeRow}>
                  <View style={styles.matchScoreBadge}>
                    <Ionicons name="sparkles" size={14} color="#FFD700" />
                    <Text style={styles.matchScoreText}>{currentProfile.matchScore || 92}% Match</Text>
                  </View>

                  <View style={styles.cardCounterBadge}>
                    <Text style={styles.cardCounterText}>{cardIndex + 1} of {filteredProfiles.length}</Text>
                  </View>
                </View>

                {/* Bottom Overlay Gradient Info Box */}
                <TouchableOpacity 
                  activeOpacity={0.95}
                  onPress={() => router.push(`/profile/${currentProfile.profileId}`)}
                  style={styles.cardInfoGradient}
                >
                  <View style={styles.nameRow}>
                    <Text style={styles.cardNameText}>
                      {currentProfile.name}, {currentProfile.age}
                    </Text>
                    {currentProfile.isVerified && (
                      <Ionicons name="checkmark-circle" size={20} color="#27AE60" style={{ marginLeft: 6 }} />
                    )}
                  </View>

                  <Text style={styles.cardSubDetailsText}>
                    📍 {currentProfile.residentCity}, {currentProfile.residentState} • {currentProfile.occupation}
                  </Text>
                  <Text style={styles.cardCasteText}>
                    🚩 {currentProfile.caste} | {currentProfile.religion} ({currentProfile.motherTongue})
                  </Text>

                  {/* Feature Pills */}
                  <View style={styles.cardFeaturePillsRow}>
                    <View style={styles.featurePill}>
                      <Text style={styles.featurePillText}>🌱 {currentProfile.diet || 'Vegetarian'}</Text>
                    </View>
                    <View style={styles.featurePill}>
                      <Text style={styles.featurePillText}>📏 {currentProfile.height || `5'6"`}</Text>
                    </View>
                    <View style={styles.featurePill}>
                      <Text style={styles.featurePillText}>💍 {currentProfile.maritalStatus || 'Never Married'}</Text>
                    </View>
                    {currentProfile.manglikStatus && (
                      <View style={styles.featurePill}>
                        <Text style={styles.featurePillText}>⭐ {currentProfile.manglikStatus}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {/* Bottom Swipe Controls Action Bar */}
              <View style={styles.swipeControlsRow}>
                {/* Undo Button */}
                <TouchableOpacity 
                  style={[styles.actionControlCircle, styles.undoBtn, historyStack.length === 0 && { opacity: 0.4 }]}
                  onPress={handleUndoCard}
                  disabled={historyStack.length === 0}
                  activeOpacity={0.8}
                >
                  <Ionicons name="arrow-undo" size={22} color="#5A4A4D" />
                </TouchableOpacity>

                {/* Skip / Pass Button */}
                <TouchableOpacity 
                  style={[styles.actionControlCircle, styles.skipBtnAction]}
                  onPress={() => handleNextCard('skip')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="close" size={30} color="#5A4A4D" />
                </TouchableOpacity>

                {/* Shortlist Button */}
                <TouchableOpacity 
                  style={[styles.actionControlCircle, styles.starBtnAction, isShortlisted(currentProfile.profileId) && styles.starBtnActive]}
                  onPress={() => handleNextCard('shortlist')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="star" size={26} color={isShortlisted(currentProfile.profileId) ? '#FFFFFF' : '#D4AF37'} />
                </TouchableOpacity>

                {/* Express Interest Button */}
                <TouchableOpacity 
                  style={[styles.actionControlPill, styles.interestBtnAction]}
                  onPress={() => handleNextCard('interest')}
                  activeOpacity={0.85}
                >
                  <Ionicons name="heart" size={24} color="#FFFFFF" />
                  <Text style={styles.interestBtnText}>Interested</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* Empty Card Stack Screen */
            <View style={styles.deckEmptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="sparkles" size={56} color="#E91E63" />
              </View>
              <Text style={styles.emptyTitle}>All Matches Viewed! 🎉</Text>
              <Text style={styles.emptySub}>
                You have reviewed all available profiles for your selected search filters.
              </Text>

              <TouchableOpacity 
                style={styles.resetDeckBtn} 
                onPress={() => {
                  setCardIndex(0);
                  setHistoryStack([]);
                }}
                activeOpacity={0.88}
              >
                <Ionicons name="refresh" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.resetDeckBtnText}>Restart Match Deck</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.switchToListBtn} 
                onPress={() => setViewMode('list')}
                activeOpacity={0.85}
              >
                <Text style={styles.switchToListBtnText}>Switch to List View</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        /* VIEW MODE 2: FILTERED LIST VIEW */
        <View style={{ flex: 1 }}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultCount}>Showing {filteredProfiles.length} profiles</Text>
            <TouchableOpacity style={styles.sortBtn} onPress={() => setSortOption(sortOption === 'Best Match' ? 'Newest' : 'Best Match')}>
              <Text style={styles.sortText}>{sortOption}</Text>
              <Ionicons name="chevron-down" size={16} color="#5A4A4D" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredProfiles}
            keyExtractor={item => item.profileId}
            renderItem={({ item }) => (
              <ProfileCard
                profile={item}
                size="compact"
                onPress={() => router.push(`/profile/${item.profileId}`)}
                onInterest={() => dispatch({ type: 'SEND_INTEREST', payload: item.profileId })}
                onShortlist={() => dispatch({ type: 'TOGGLE_SHORTLIST', payload: item.profileId })}
                isShortlisted={isShortlisted(item.profileId)}
                isInterestSent={isInterestSent(item.profileId)}
              />
            )}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={64} color="#8C7A7C" />
                <Text style={styles.emptyTitle}>No profiles found</Text>
                <Text style={styles.emptySub}>Try adjusting your filters or search terms</Text>
              </View>
            }
          />
        </View>
      )}

      {/* Filter Modal */}
      <Modal visible={isFilterVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
              <Ionicons name="close" size={24} color="#2C1A1D" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search Filters</Text>
            <TouchableOpacity onPress={() => {
              setFilters({
                types: [], onlineStatus: [], activity: [], postedBy: [],
                religion: [], motherTongue: [], caste: [], location: [],
                income: [], employment: [], education: [], occupation: [],
                photo: [], diet: [], maritalStatus: [], manglik: []
              });
              setCardIndex(0);
            }}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {renderFilterSection('Types of Matches', ['All', 'Verified', 'Just Joined', 'Nearby', 'Newspaper-linked'], 'types')}
            {renderFilterSection('Online Status', ['All', 'Online Now'], 'onlineStatus')}
            {renderFilterSection('Activity', ['Active last week', 'Active last month', 'Active last 2 months'], 'activity')}
            {renderFilterSection('Profile Posted By', ['Self', 'Parent', 'Sibling', 'Relative', 'Friend'], 'postedBy')}
            {renderFilterSection('Religion', ['Hindu', 'Muslim', 'Sikh', 'Jain', 'Christian', 'Others'], 'religion')}
            {renderFilterSection('Mother Tongue', ['Hindi', 'Marwari/Rajasthani', 'Punjabi', 'Gujarati', 'Marathi', 'Tamil', 'Others'], 'motherTongue')}
            {renderFilterSection('Caste', ['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Sindhi', 'Others'], 'caste')}
            {renderFilterSection('Employment', ['Private', 'Govt/Public', 'Business/Self-employed', 'Defence', 'Civil Services'], 'employment')}
            {renderFilterSection('Education', ['Engineering', 'Medicine', 'Management', 'Arts/Science', 'Law', 'Doctorate', 'Others'], 'education')}
            {renderFilterSection('Photo', ['All', 'With Photo only'], 'photo')}
            {renderFilterSection('Marital Status', ['Doesn\'t matter', 'Never married', 'Divorced', 'Widowed'], 'maritalStatus')}
            {renderFilterSection('Diet', ['Veg', 'Non-veg', 'Eggetarian', 'Jain'], 'diet')}
            {renderFilterSection('Manglik', ['Manglik', 'Non-manglik', 'Doesn\'t matter'], 'manglik')}
            <View style={{height: 100}} />
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyBtn} onPress={() => {
              setIsFilterVisible(false);
              setCardIndex(0);
            }}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F6' },
  header: { 
    backgroundColor: '#FFFFFF', 
    paddingTop: Platform.OS === 'android' ? 40 : 10, 
    paddingBottom: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#EFE6DD' 
  },
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  headerBrandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E91E63',
    fontFamily: 'serif',
  },
  modeSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#FAF5F7',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  modeTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  modeTabBtnActive: {
    backgroundColor: '#E91E63',
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5A4A4D',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  searchBar: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FAF5F7', 
    borderRadius: 14, 
    paddingHorizontal: 14, 
    height: 42, 
    marginRight: 10, 
    borderWidth: 1, 
    borderColor: '#EFE6DD' 
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#2C1A1D' },
  filterBtn: { 
    width: 42, 
    height: 42, 
    borderRadius: 14, 
    backgroundColor: '#FFF0F3', 
    borderWidth: 1, 
    borderColor: '#E91E63', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  filterBadge: { 
    position: 'absolute', 
    top: -4, 
    right: -4, 
    backgroundColor: '#E91E63', 
    borderRadius: 10, 
    minWidth: 18, 
    height: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#FFFFFF' 
  },
  filterBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  chipsScroll: { maxHeight: 36 },
  chipsContainer: { paddingHorizontal: 16, paddingBottom: 4 },
  quickChip: { 
    paddingHorizontal: 14, 
    paddingVertical: 6, 
    borderRadius: 16, 
    backgroundColor: '#FAF5F7', 
    marginRight: 8, 
    borderWidth: 1, 
    borderColor: '#EFE6DD' 
  },
  quickChipActive: { backgroundColor: '#E91E63', borderColor: '#E91E63' },
  quickChipText: { color: '#5A4A4D', fontSize: 12, fontWeight: '600' },
  quickChipTextActive: { color: '#FFFFFF', fontWeight: '800' },

  /* Toast notification */
  toastContainer: {
    position: 'absolute',
    top: 155,
    alignSelf: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(44, 26, 29, 0.92)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  /* Swipe Deck Area */
  swipeDeckArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    justifyContent: 'center',
  },
  swipeTipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
    backgroundColor: '#FFF0F3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFD6DF',
  },
  swipeTipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E91E63',
  },
  cardStackContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  underCardPreview: {
    position: 'absolute',
    top: 14,
    left: 8,
    right: 8,
    bottom: 74,
    borderRadius: 24,
    overflow: 'hidden',
    opacity: 0.4,
    transform: [{ scale: 0.95 }],
    backgroundColor: '#000',
  },
  underCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  mainCard: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#2C1A1D',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    marginBottom: 16,
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
  },
  cardMainPhoto: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  /* Stamp Overlays */
  stampContainer: {
    position: 'absolute',
    zIndex: 99,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 3,
  },
  likeStampContainer: {
    top: 50,
    left: 20,
    borderColor: '#27AE60',
    backgroundColor: 'rgba(39, 174, 96, 0.25)',
    transform: [{ rotate: '-15deg' }],
  },
  likeStampText: {
    color: '#27AE60',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  passStampContainer: {
    top: 50,
    right: 20,
    borderColor: '#E74C3C',
    backgroundColor: 'rgba(231, 76, 60, 0.25)',
    transform: [{ rotate: '15deg' }],
  },
  passStampText: {
    color: '#E74C3C',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  starStampContainer: {
    bottom: 180,
    alignSelf: 'center',
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
  },
  starStampText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },

  cardTopBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 10,
  },
  matchScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(44,26,29,0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.5)',
    gap: 4,
  },
  matchScoreText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '800',
  },
  cardCounterBadge: {
    backgroundColor: 'rgba(44,26,29,0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardCounterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cardInfoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(44, 26, 29, 0.88)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardNameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  cardSubDetailsText: {
    fontSize: 13,
    color: '#EFE6DD',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardCasteText: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: '700',
    marginBottom: 10,
  },
  cardFeaturePillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featurePill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  featurePillText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  /* Action Controls Bar */
  swipeControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
  },
  actionControlCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  undoBtn: {
    backgroundColor: '#F5EFE6',
  },
  skipBtnAction: {
    backgroundColor: '#FFFFFF',
  },
  starBtnAction: {
    backgroundColor: '#FFFDF9',
    borderColor: '#D4AF37',
  },
  starBtnActive: {
    backgroundColor: '#D4AF37',
  },
  actionControlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 28,
    gap: 8,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  interestBtnAction: {
    backgroundColor: '#E91E63',
  },
  interestBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  /* Empty Deck Container */
  deckEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 14,
    color: '#8C7A7C',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  resetDeckBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 28,
    marginBottom: 12,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  resetDeckBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  switchToListBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  switchToListBtnText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '700',
  },

  /* List view styles */
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  resultCount: { fontSize: 13, color: '#5A4A4D', fontWeight: '600' },
  sortBtn: { flexDirection: 'row', alignItems: 'center' },
  sortText: { fontSize: 13, color: '#2C1A1D', marginRight: 4, fontWeight: '700' },
  listContainer: { paddingBottom: 20 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },

  /* Modal styles */
  modalContainer: { flex: 1, backgroundColor: '#FFF4F6' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EFE6DD', backgroundColor: '#FFFFFF' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#2C1A1D', fontFamily: 'serif' },
  resetText: { fontSize: 15, color: '#E91E63', fontWeight: '700' },
  modalContent: { flex: 1, padding: 16 },
  filterSection: { marginBottom: 24 },
  filterTitle: { fontSize: 15, fontWeight: '800', color: '#2C1A1D', marginBottom: 12 },
  filterOptions: { flexDirection: 'row', flexWrap: 'wrap' },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EFE6DD', marginRight: 8, marginBottom: 8 },
  filterChipSelected: { backgroundColor: '#FFF0F3', borderColor: '#E91E63' },
  filterChipText: { fontSize: 13, color: '#5A4A4D' },
  filterChipTextSelected: { color: '#E91E63', fontWeight: '800' },
  modalFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#EFE6DD', backgroundColor: '#FFFFFF' },
  applyBtn: { backgroundColor: '#E91E63', borderRadius: 28, paddingVertical: 14, alignItems: 'center' },
  applyBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' }
});
