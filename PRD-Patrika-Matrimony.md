# Patrika Matrimony — Product Requirements Document (PRD)

**Document Status**: Draft for Product Review  
**Version**: M1.0  
**Date**: July 2026  
**Brand Owner**: Rajasthan Patrika (Patrika Group)  
**Target Platforms**: Mobile (Android Primary, iOS Compatible, Web Preview)  
**Positioning**: *“Trusted matches from Rajasthan Patrika”*

---

## 1. Executive Summary & Product Architecture

### 1.1 Product Vision & Positioning
**Patrika Matrimony** is a serious, trust-first mobile application designed for **Rajasthan Patrika**, one of India’s most revered newspaper groups known nationwide for its print matrimonial classifieds. The application bridges Rajasthan Patrika's print classified legacy with modern digital matching, offering a respectful, family-inclusive, and culturally aligned matrimonial ecosystem.

Unlike casual dating apps, Patrika Matrimony is built specifically for serious marriage seekers and parents/relatives. It emphasizes trust badges, verified community identities (Rajput, Agarwal, Brahmin, Marwari, Jain, Sikh, Sindhi, etc.), gotra/horoscope details, and seamless linking with Rajasthan Patrika newspaper classified ads.

### 1.2 Target User Personas
1. **The Self-Seeker (Individual)**: Young working professionals (aged 22–38) seeking a compatible partner while maintaining cultural and family alignment.
2. **The Parent / Relative Initiator**: Parents, siblings, or elders creating and managing profiles for children or relatives. Requires clear typography, simple navigation, and multi-user privacy options.
3. **The Print-to-Digital Reader**: Traditional readers transitioning from Rajasthan Patrika's Sunday matrimonial newspaper classifieds into the mobile app.
4. **The Community & NRI Member**: Rajasthani diaspora across India (Mumbai, Bengaluru, Delhi) and abroad (USA, UK, UAE) seeking verified matches within specific ancestral origins.

### 1.3 Core Product Pillars
| Product Pillar | What the User Experiences |
| :--- | :--- |
| **Print-to-Digital Ad Integration** | Allows users to search, locate, and link their Rajasthan Patrika print classified ad directly to their digital profile, unlocking the 'Patrika Verified' badge. |
| **Trust & Multi-Level Verification** | 7-step verification system including live selfie AI check, Govt ID (Aadhaar/PAN/Passport), Mobile OTP, Education, and Income badges. |
| **Community & Cultural Precision** | Tailored matching on Gotra, Sub-Caste, Manglik status, Ancestral Native District, Horoscope/Nakshatra, and Diet preferences. |
| **Privacy & Security First** | Photo privacy controls, phone number masking, anti-screenshot measures, blocking/reporting, and parent/relative profile management modes. |
| **Freemium Monetization Model** | Free profile creation and browsing with contextual paywalls for Gold, Platinum, and Relationship Manager Assisted plans. |

---

## 2. Screen-by-Screen & Section-by-Section Product Specifications

### 2.1 Splash & Boot Screen (`app/(auth)/splash.tsx`)
- **Purpose**: First brand impression, introducing Patrika Matrimony heritage and primary onboarding gateways.
- **Entry Point / Trigger**: App launch / cold start.
- **Key Screen Elements**:
  - Deep Red (`#C0392B`) to dark burgundy gradient canvas.
  - Animated Patrika Matrimony crest & bold brand typography.
  - Tagline: *"Trusted matches from Rajasthan Patrika"*.
  - Primary CTAs: `'Create Profile'` and `'Login'`.
  - Community shortcut chips (Rajput, Marwari, Brahmin, Jain).
  - Newspaper classified link banner at bottom.
- **Product Rationale**: Establishes institutional trust instantly while giving fast access to both new registration and login flows.

### 2.2 Login Screen (`app/(auth)/login.tsx`)
- **Purpose**: Dual-mode login supporting quick Mobile OTP and traditional Email/Password authentication.
- **Entry Point / Trigger**: Tapping `'Login'` on Splash screen.
- **Key Screen Elements**:
  - Two main tab switchers: `'Mobile OTP'` | `'Email & Password'`.
  - Country code selector (`+91` default) + 10-digit phone input.
  - `'I am a Parent/Relative creating profile for family'` toggle switch.
  - Primary red button: `'Get OTP'`.
  - Forgot password link & help drawer trigger.
- **Product Rationale**: Parents and older family members prefer phone OTP login without managing complex passwords.

### 2.3 OTP Verification Screen (`app/(auth)/otp.tsx`)
- **Purpose**: Secure 6-digit OTP verification with resend timer.
- **Entry Point / Trigger**: Submitting mobile number on Login screen.
- **Key Screen Elements**:
  - 6 individual digit input boxes with auto-focus advance.
  - 30-second resend countdown timer.
  - Phone number edit link.
  - Primary CTA button: `'Verify & Proceed'`.
  - Auto-dispatch demo user session (`P001`) for instant test entry.
- **Product Rationale**: Eliminates friction during verification while enforcing mobile number ownership.

### 2.4 13-Step Profile Creation Wizard (`app/(auth)/onboarding/step1.tsx` to `step13.tsx`)
- **Purpose**: Comprehensive step-by-step onboarding collecting essential matrimonial parameters.
- **Entry Point / Trigger**: Tapping `'Create Profile'` on Splash screen.
- **Key Screen Elements**:
  - **Step 1**: Profile Creator (Self, Son, Daughter, Brother, Sister, Relative)
  - **Step 2**: Mother Tongue Selection (Hindi, Marwari, Punjabi, Gujarati, etc.)
  - **Step 3**: Basic Physical Details (Gender, DOB, Height, Physical Status, Marital Status)
  - **Step 4**: Religion & Community (Religion, Caste, Sub-caste, Gotra, Manglik Status)
  - **Step 5**: Location Details (Country, State, City with Rajasthan quick-chips)
  - **Step 6**: Education & Career (Degree, Field, Employment Type, Occupation, Annual Income)
  - **Step 7**: Family Background & Ancestral Origin (Family Status, Native District)
  - **Step 8**: Lifestyle Preferences (Diet, Smoking, Drinking, Hobbies)
  - **Step 9**: Horoscope Details Optional (Star/Nakshatra, Birth Time, Birth Place)
  - **Step 10**: Institutional Details (College/University, Company Name, Current Role)
  - **Step 11**: Account Setup (Full Name, Email, Password)
  - **Step 12**: Photo Upload & Verification Prompt (Primary photo, gallery slots, selfie hint)
  - **Step 13**: Partner Preferences (Age range, height range, caste, location, diet)
- **Product Rationale**: Chunking profile creation into 13 short steps prevents drop-off and yields complete, high-quality profile data.

### 2.5 Home Screen (`app/(tabs)/home.tsx`)
- **Purpose**: Central match discovery hub featuring personalized recommendation rows and print ad integration.
- **Entry Point / Trigger**: Default tab after login.
- **Key Screen Elements**:
  - Top header: Patrika Matrimony red logo + Notification bell (badge count 3).
  - **Section 1**: `'Recommended for You'` — 10 horizontal scrolling profile cards matched to partner preferences.
  - **Section 2**: `'New Profiles'` — profiles joined in last 30 days with `'New'` badge.
  - **Section 3**: `'Verified Profiles'` — profiles with verified badges.
  - **Section 4**: `'Nearby Profiles'` — profiles in same city/state (e.g. Jaipur, Rajasthan).
  - **Section 5**: `'From Rajasthan Patrika Ads'` — print classified linked profiles with newspaper icon.
  - `ProfileCard` component with photo, name, age, city, caste, match %, and 3 action buttons (Interest, View, Shortlist).
- **Product Rationale**: Horizontal scrolling rows allow users to explore diverse match categories effortlessly.

### 2.6 Search & Discovery Screen (`app/(tabs)/search.tsx`)
- **Purpose**: Advanced search engine with a 17-category filter drawer for pin-point match discovery.
- **Entry Point / Trigger**: Search tab in bottom bar.
- **Key Screen Elements**:
  - Top search input field + quick filter chips (`'All'`, `'Nearby'`, `'New'`, `'Verified'`, `'Newspaper Ad'`).
  - Filter Drawer with 17 collapsible filter sections: Religion, Caste, Gotra, Mother Tongue, City/State, Income, Education, Occupation, Diet, Manglik, Photo Only, Age Slider, Height Range.
  - Active filter counter badge on filter button.
  - Search results list: compact horizontal profile cards with instant filter matching.
- **Product Rationale**: Matrimonial searches require exact parameter matching. The 17 filters empower families to find exact matches.

### 2.7 Profile Details Screen (`app/profile/[id].tsx`)
- **Purpose**: Comprehensive view of a candidate's full profile, photos, horoscope, and contact actions.
- **Entry Point / Trigger**: Tapping any profile card across the app.
- **Key Screen Elements**:
  - Hero photo section with full-width image, gradient overlay, gallery dots, and fullscreen viewer.
  - Name, Age, Match % badge, City/State, Marital status, Caste, and Verification badges.
  - Action bar: Shortlist (heart), Send Interest (handshake), Message (chat), Call (phone).
  - Contextual paywall trigger: Free members tapping Message/Call see `'Upgrade to Gold'` bottom sheet.
  - Detailed sections: About Me, Basic Details, Religious & Social Background (Gotra, Manglik), Professional Details, Family Background, Horoscope Accordion, Hobbies Chips, Photos Gallery, and Similar Profiles horizontal carousel.
  - Sticky bottom bar: Send Interest & Message buttons.
- **Product Rationale**: Presents all sensitive and cultural information in a clean, dignified, expandable layout.

### 2.8 Chats & Calls Screen (`app/(tabs)/chats.tsx`)
- **Purpose**: Communication hub for active conversations, interest responses, and voice call history.
- **Entry Point / Trigger**: Chats tab in bottom bar.
- **Key Screen Elements**:
  - Top tab switcher: `'Chats'` | `'Calls'`.
  - Sub-filters: `'All'`, `'Accepted'`, `'New Interests'`.
  - Chat list items: Profile photo, Name, Last message text, Timestamp, Unread count badge.
  - Calls tab: Incoming, Outgoing, and Missed call history with quick callback button.
  - Free Plan banner: `'Upgrade to Gold to chat with matches →'`.
- **Product Rationale**: Separating chats and call history keeps communications organized while serving as a primary upgrade trigger.

### 2.9 Chat Conversation Screen (`app/chat/[id].tsx`)
- **Purpose**: Real-time 1-on-1 messaging interface with candidate or family contact.
- **Entry Point / Trigger**: Tapping any chat item in Chats list.
- **Key Screen Elements**:
  - Header: Back arrow, candidate photo, name, online status, voice call & video call buttons.
  - Message list: Sent messages in red (`#C0392B`) right bubbles, received messages in white left bubbles.
  - Read status tick marks (double tick).
  - Input area with text input, attachment icon, and send button.
  - Paywall lock for Free plan users with upgrade bottom sheet.
- **Product Rationale**: Clean, secure messaging environment with read receipts and instant upgrade options.

### 2.10 Shortlist & Interests Screen (`app/(tabs)/shortlist.tsx`)
- **Purpose**: Manage saved profiles and track sent/received interest invitations.
- **Entry Point / Trigger**: Shortlist tab in bottom bar.
- **Key Screen Elements**:
  - 2-column grid of shortlisted profile cards with quick remove option.
  - Interests Received section: Profile cards with `'Accept'` (green) and `'Decline'` (gray) buttons.
  - Interests Sent section: Status chips (`'Interest Sent'`, `'Accepted'`, `'Declined'`).
  - Empty state illustrations for shortlist and interests.
- **Product Rationale**: Allows users and parents to track shortlists and manage pending marriage proposals in one clean workspace.

### 2.11 Rajasthan Patrika Newspaper Ads Screen (`app/newspaper-ads/index.tsx`)
- **Purpose**: Bridge traditional print classified ads with digital app profiles.
- **Entry Point / Trigger**: Navigating from Home banner, Profile menu, or Newspaper Ad filter.
- **Key Screen Elements**:
  - Header: `'🗞️ Rajasthan Patrika Matrimonial Ads'`.
  - Banner: `'Have an ad in Rajasthan Patrika? Link your print ad to get Patrika Verified badge'`.
  - Filter chips: All Ads, Linked, Linkable + Community category chips (Hindu-Rajput, Jain, etc.).
  - Print-style ad cards displaying edition date, city, ad text body, masked phone number, and linked profile card.
  - `'Link My Ad'` Modal: Edition date picker, city picker, Ad Reference ID input, search button, and confirmation link CTA.
- **Product Rationale**: Creates a unique competitive advantage by digitizing Rajasthan Patrika's print advertiser base.

### 2.12 Trust & Verification Centre Screen (`app/verification/index.tsx`)
- **Purpose**: Increase platform safety and trust by driving users to verify their identities.
- **Entry Point / Trigger**: Profile tab ➔ Verification Centre.
- **Key Screen Elements**:
  - Trust Score progress bar (e.g., 75% Verified).
  - 7 Verification Cards: Mobile OTP (Verified), Live Selfie AI Check (Pending/Verify), Govt ID Aadhaar/PAN (Upload), Education Certificate (Upload), Salary Slip/ITR (Upload), Location (NRI), LinkedIn/Social Link.
  - Interactive selfie camera capture simulation and document file picker.
  - Verification badge descriptions and status chips.
- **Product Rationale**: Verified profiles receive 5x more responses. Gamifying verification builds platform credibility.

### 2.13 Subscription & Monetization Screen (`app/subscription/index.tsx`)
- **Purpose**: Present premium membership plans and execute seamless upgrade checkout.
- **Entry Point / Trigger**: Upgrade buttons across app, Profile tab, or paywall bottom sheets.
- **Key Screen Elements**:
  - 4 Plan Cards: Free (Gray), Gold ₹1,999/3mo (Gold), Platinum ₹3,999/6mo (Purple - Most Popular), Assisted ₹9,999/yr (Red).
  - Feature comparison matrix table.
  - Payment Checkout Modal: Order summary, tax breakdown, payment mode selector (UPI: GPay/PhonePe/Paytm/BHIM, Credit/Debit Card, Net Banking).
  - Payment Success Screen with green checkmark animation, transaction ref ID, and instant plan activation.
- **Product Rationale**: Contextual, transparent pricing with Indian payment methods maximizes subscription conversion.

### 2.14 My Profile & Account Screen (`app/(tabs)/profile.tsx`)
- **Purpose**: Manage personal profile, account settings, privacy, and membership status.
- **Entry Point / Trigger**: Profile tab in bottom bar.
- **Key Screen Elements**:
  - Profile Header: Photo, Name, Age, Membership Badge (`'Free Member'`, `'Gold'`, `'Platinum'`), Upgrade CTA.
  - Profile completion progress bar (75% complete) with fill prompt.
  - Quick stats row: Interests Received (12), Accepted (5), Profile Views (234).
  - Menu sections: My Account (Edit Profile modal, Partner Preferences, Subscription, Verification), Newspaper Integration, Privacy & Safety, Support, Logout.
- **Product Rationale**: Central control panel for managing visibility, editing details, and monitoring response metrics.

---

## 3. Monetization & Pricing Tiers Specification

Patrika Matrimony employs a freemium model. Free users can register, build complete profiles, browse matches, and send limited interests. Access to contact numbers, direct chat messaging, horoscope matching details, and dedicated relationship management requires an upgraded plan.

| Plan Name | Price & Duration | Target User | Key Unlocked Features | Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Free** | ₹0 / Lifetime | New registrants, browsers | Create profile, 20 profile views/day, 5 interests/day, basic search filters | No phone numbers, no chat, no horoscope match |
| **Gold** | ₹1,999 / 3 Months | Active marriage seekers | Unlimited profile views, unlimited interests, view phone/email, direct in-app messaging, priority search | No voice calls, no relationship manager |
| **Platinum** *(Popular)* | ₹3,999 / 6 Months | High-intent families | Everything in Gold + in-app voice calls, advanced horoscope filter, private photo access, 10 profile boosts/mo | No dedicated relationship manager |
| **Assisted** | ₹9,999 / 1 Year | Hectic professionals, parents | Everything in Platinum + Dedicated Relationship Manager (RM), RM shortlists matches, offline meeting coordination, 24/7 priority support | None |

---

## 4. Technical Build & System Architecture Summary

- **Frontend Stack**: React Native 0.86, Expo SDK 57, Expo Router v57 (file-based navigation), TypeScript ~6.0.
- **UI & Styling**: Custom StyleSheet tokens, React Native Paper UI elements, `@expo/vector-icons`, `expo-linear-gradient`.
- **State Management**: React Context API (`AppContext`) + `useReducer` with `@react-native-async-storage/async-storage` state persistence.
- **Data Layer**: 100% local mock JSON datasets containing 200 profiles (`profiles.json`), 500 interests (`interests.json`), 100 chat threads (`chats.json`), 60 subscriptions (`subscriptions.json`), and 50 print ads (`newspaper-ads.json`).
- **Build & Deployment**: Configured for local Expo Go testing, React Native Web bundling (`react-native-web`), and EAS Cloud APK generation (`eas.json`).
