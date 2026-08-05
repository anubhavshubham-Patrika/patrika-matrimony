// src/context/AppContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profilesData from '../data/profiles.json';
import plansData from '../data/plans.json';

export type Plan = 'Free' | 'Gold' | 'Platinum' | 'Assisted';

export interface Profile {
  profileId: string;
  linkedUserId: string;
  profileFor: string;
  name: string;
  gender: string;
  DOB: string;
  age: number;
  height: string;
  physicalStatus: string;
  maritalStatus: string;
  motherTongue: string;
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string | null;
  manglikStatus: string;
  country: string;
  residentState: string;
  residentCity: string;
  education: { degree: string; field: string };
  employmentType: string;
  occupation: string;
  annualIncomeRange: string;
  familyStatus: string;
  ancestralOrigin: string;
  aboutMe: string;
  aboutFamily: string;
  hobbies: string[];
  interests: string[];
  diet: string;
  smoking: string;
  drinking: string;
  horoscope: { star: string; timeOfBirth: string; placeOfBirth: string };
  collegeName: string;
  organizationName: string;
  profilePhotoURL: string;
  galleryPhotoURLs: string[];
  isNewspaperAdLinked: boolean;
  offlineAdReferenceId: string | null;
  verificationBadges: string[];
  isVerified: boolean;
  isPremium: boolean;
  planType: Plan;
  createdAt: string;
  lastActiveAt: string;
  matchScore: number;
}

interface AppState {
  isLoggedIn: boolean;
  currentUser: {
    userId: string;
    name: string;
    mobile: string;
    email: string;
    profileId: string;
  } | null;
  myProfile: Profile | null;
  currentPlan: Plan;
  shortlistedProfiles: string[];
  sentInterests: string[];
  declinedProfiles: string[];
  searchFilters: SearchFilters;
  onboardingData: Partial<Profile>;
  onboardingStep: number;
  language: 'en' | 'hi';
}

export interface SearchFilters {
  minAge: number;
  maxAge: number;
  religion: string;
  caste: string;
  city: string;
  state: string;
  maritalStatus: string;
  diet: string;
  education: string;
  employmentType: string;
  minIncome: string;
  verifiedOnly: boolean;
  withPhotoOnly: boolean;
  gender: string;
}

export type AppAction =
  | { type: 'LOGIN'; payload: AppState['currentUser'] }
  | { type: 'LOGOUT' }
  | { type: 'SET_PROFILE'; payload: Profile }
  | { type: 'SET_PLAN'; payload: Plan }
  | { type: 'TOGGLE_SHORTLIST'; payload: string }
  | { type: 'SEND_INTEREST'; payload: string }
  | { type: 'DECLINE_PROFILE'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<SearchFilters> }
  | { type: 'RESET_FILTERS' }
  | { type: 'UPDATE_ONBOARDING'; payload: Partial<Profile> }
  | { type: 'SET_ONBOARDING_STEP'; payload: number }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'hi' };

const defaultFilters: SearchFilters = {
  minAge: 21,
  maxAge: 45,
  religion: '',
  caste: '',
  city: '',
  state: '',
  maritalStatus: '',
  diet: '',
  education: '',
  employmentType: '',
  minIncome: '',
  verifiedOnly: false,
  withPhotoOnly: true,
  gender: 'Female',
};

const initialState: AppState = {
  isLoggedIn: false,
  currentUser: null,
  myProfile: null,
  currentPlan: 'Free',
  shortlistedProfiles: [],
  sentInterests: [],
  declinedProfiles: [],
  searchFilters: defaultFilters,
  onboardingData: {},
  onboardingStep: 1,
  language: 'en',
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true, currentUser: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_PROFILE':
      return { ...state, myProfile: action.payload };
    case 'SET_PLAN':
      return { ...state, currentPlan: action.payload };
    case 'TOGGLE_SHORTLIST':
      const isShortlisted = state.shortlistedProfiles.includes(action.payload);
      return {
        ...state,
        shortlistedProfiles: isShortlisted
          ? state.shortlistedProfiles.filter((id) => id !== action.payload)
          : [...state.shortlistedProfiles, action.payload],
      };
    case 'SEND_INTEREST':
      return {
        ...state,
        sentInterests: [...state.sentInterests, action.payload],
      };
    case 'DECLINE_PROFILE':
      return {
        ...state,
        declinedProfiles: [...state.declinedProfiles, action.payload],
      };
    case 'SET_FILTERS':
      return { ...state, searchFilters: { ...state.searchFilters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, searchFilters: defaultFilters };
    case 'UPDATE_ONBOARDING':
      return { ...state, onboardingData: { ...state.onboardingData, ...action.payload } };
    case 'SET_ONBOARDING_STEP':
      return { ...state, onboardingStep: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  profiles: Profile[];
  plans: typeof plansData;
}>({
  state: initialState,
  dispatch: () => {},
  profiles: [],
  plans: plansData,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem('appState').then((stored) => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.isLoggedIn) dispatch({ type: 'LOGIN', payload: parsed.currentUser });
          if (parsed.currentPlan) dispatch({ type: 'SET_PLAN', payload: parsed.currentPlan });
          if (parsed.shortlistedProfiles?.length) {
            parsed.shortlistedProfiles.forEach((id: string) =>
              dispatch({ type: 'TOGGLE_SHORTLIST', payload: id })
            );
          }
        } catch {}
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('appState', JSON.stringify({
      isLoggedIn: state.isLoggedIn,
      currentUser: state.currentUser,
      currentPlan: state.currentPlan,
      shortlistedProfiles: state.shortlistedProfiles,
    }));
  }, [state.isLoggedIn, state.currentUser, state.currentPlan, state.shortlistedProfiles]);

  return (
    <AppContext.Provider value={{ state, dispatch, profiles: profilesData as Profile[], plans: plansData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
