import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Dimensions, BackHandler , Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './styles';

// Screens
import GetStartedScreen from './screens/GetStartedScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyQRScreen from './screens/MyQRScreen';
import ScanQRScreen from './screens/ScanQRScreen';
import ContactsScreen from './screens/ContactsScreen';
import ContactDetailScreen from './screens/ContactDetailScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom tabs (MyQR, Scan, Contacts, ProfileEdit)
function MainTabs({
  isDarkMode,
  userProfile,
  contacts,
  setContacts,
  scanned,
  setScanned,
  permission,
  requestPermission,
  handleBarCodeScanned,
  handleSelectContact,
  setIsDarkMode,
  setUserProfile,
}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#111827' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: isDarkMode ? '#9CA3AF' : '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'MyQR') {
            iconSource = require('./assets/myQR.png');
          } else if (route.name === 'Scan') {
            iconSource = require('./assets/scanQR.png');
          } else if (route.name === 'Contacts') {
            iconSource = require('./assets/myContacts.png');
          } else if (route.name === 'ProfileEdit') {
            iconSource = require('./assets/profile.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#3B82F6' : color,
              }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="MyQR"
        options={{ title: 'My QR' }}
      >
        {() => <MyQRScreen userProfile={userProfile} isDarkMode={isDarkMode} />}
      </Tab.Screen>

      <Tab.Screen
        name="Scan"
        options={{ title: 'Scan' }}
      >
        {() => (
          <ScanQRScreen
            isDarkMode={isDarkMode}
            scanned={scanned}
            setScanned={setScanned}
            permission={permission}
            requestPermission={requestPermission}
            onBarCodeScanned={handleBarCodeScanned}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Contacts"
        options={{ title: 'Contacts' }}
      >
        {({ navigation }) => (
          <ContactsScreen
            contacts={contacts}
            isDarkMode={isDarkMode}
            onSelectContact={(contact) => {
              handleSelectContact(contact);
              navigation.navigate('ContactDetail', { contact });
            }}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="ProfileEdit"
        options={{ title: 'Profile' }}
      >
        {() => (
          <ProfileEditScreen
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [userProfile, setUserProfile] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    instagram: '',
  });
  const [contacts, setContacts] = useState([]);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Load user profile, contacts, and dark mode on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setUserProfile(profile);
        }

        const savedContacts = await AsyncStorage.getItem('contacts');
        if (savedContacts) {
          setContacts(JSON.parse(savedContacts));
        }

        const savedDarkMode = await AsyncStorage.getItem('isDarkMode');
        if (savedDarkMode !== null) {
          setIsDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save user profile whenever it changes
  useEffect(() => {
    const saveProfile = async () => {
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    };

    if (userProfile.name || userProfile.email || userProfile.phone) {
      saveProfile();
    }
  }, [userProfile]);

  // Save contacts whenever they change
  useEffect(() => {
    const saveContacts = async () => {
      try {
        await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (error) {
        console.error('Error saving contacts:', error);
      }
    };

    if (contacts.length > 0) {
      saveContacts();
    }
  }, [contacts]);

  // Save dark mode preference
  useEffect(() => {
    const saveDarkMode = async () => {
      try {
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      } catch (error) {
        console.error('Error saving dark mode:', error);
      }
    };

    saveDarkMode();
  }, [isDarkMode]);

  // QR scan handler
  const handleBarCodeScanned = useCallback(
    ({ type, data }) => {
      setScanned(true);
      try {
        const contactData = JSON.parse(data);

        const existingContactIndex = contacts.findIndex(
          (contact) =>
            (contactData.email &&
              contact.email &&
              contact.email.toLowerCase() ===
                contactData.email.toLowerCase()) ||
            (contactData.phone &&
              contact.phone &&
              contact.phone === contactData.phone)
        );

        if (existingContactIndex !== -1) {
          const updatedContact = {
            ...contacts[existingContactIndex],
            name: contactData.name || contacts[existingContactIndex].name,
            email: contactData.email || contacts[existingContactIndex].email,
            phone: contactData.phone || contacts[existingContactIndex].phone,
            linkedin:
              contactData.linkedin ||
              contacts[existingContactIndex].linkedin ||
              '',
            instagram:
              contactData.instagram ||
              contacts[existingContactIndex].instagram ||
              '',
          };

          setContacts((prevContacts) => {
            const newContacts = [...prevContacts];
            newContacts[existingContactIndex] = updatedContact;
            return newContacts;
          });

          Alert.alert(
            'Contact Updated!',
            `${updatedContact.name}'s information has been updated.`,
            [{ text: 'OK', onPress: () => setScanned(false) }]
          );
          return;
        }

        const newContact = {
          id: Date.now().toString(),
          name: contactData.name || 'Unknown Contact',
          email: contactData.email || '',
          phone: contactData.phone || '',
          linkedin: contactData.linkedin || '',
          instagram: contactData.instagram || '',
        };
        setContacts((prevContacts) => [...prevContacts, newContact]);
        Alert.alert(
          'Contact Added!',
          `${newContact.name} has been added to your contacts.`,
          [{ text: 'OK', onPress: () => setScanned(false) }]
        );
      } catch (error) {
        Alert.alert(
          'QR Code Scanned',
          `Data: ${data}`,
          [{ text: 'OK', onPress: () => setScanned(false) }]
        );
      }
    },
    [contacts]
  );

  const handleSelectContact = useCallback((contact) => {
    setSelectedContact(contact);
  }, []);

  const handleDeleteContact = useCallback((contact) => {
    setContacts((prevContacts) => prevContacts.filter((c) => c.id !== contact.id));
    Alert.alert(
      'Contact Deleted',
      `${contact.name} has been removed from your contacts.`
    );
    setSelectedContact(null);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted">
            {({ navigation }) => (
              <GetStartedScreen
                isDarkMode={isDarkMode}
                onGetStarted={() => navigation.navigate('Profile')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Profile">
            {({ navigation }) => (
              <ProfileScreen
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                isDarkMode={isDarkMode}
                onProfileCompleted={() => navigation.replace('MainTabs')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="MainTabs">
            {() => (
              <MainTabs
                isDarkMode={isDarkMode}
                userProfile={userProfile}
                contacts={contacts}
                setContacts={setContacts}
                scanned={scanned}
                setScanned={setScanned}
                permission={permission}
                requestPermission={requestPermission}
                handleBarCodeScanned={handleBarCodeScanned}
                handleSelectContact={handleSelectContact}
                setIsDarkMode={setIsDarkMode}
                setUserProfile={setUserProfile}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="ContactDetail">
            {({ navigation, route }) => (
              <ContactDetailScreen
                contact={route.params?.contact}
                isDarkMode={isDarkMode}
                onBack={() => navigation.goBack()}
                onDeleteContact={(contact) => {
                  handleDeleteContact(contact);
                  navigation.goBack();
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}