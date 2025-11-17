import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  FlatList,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  Clipboard,
  Linking,
  BackHandler
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userProfile, setUserProfile] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    instagram: ''
  });
  const [contacts, setContacts] = useState([]);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Load user profile and contacts on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user profile
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setUserProfile(profile);
          // If profile exists, skip welcome screen
          if (profile.name && profile.email && profile.phone) {
            setCurrentScreen('myqr');
          }
        }

        // Load contacts
        const savedContacts = await AsyncStorage.getItem('contacts');
        if (savedContacts) {
          setContacts(JSON.parse(savedContacts));
        }

        // Load dark mode preference
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

  // Handle Android back button and gestures
  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'contactdetail') {
        setSelectedContact(null);
        setCurrentScreen('contacts');
        return true; // Prevent default behavior (exit app)
      }
      return false; // Allow default behavior for other screens
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [currentScreen]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const contactData = JSON.parse(data);
      
      // Check if contact already exists based on email or phone
      const existingContactIndex = contacts.findIndex(contact => 
        (contactData.email && contact.email && contact.email.toLowerCase() === contactData.email.toLowerCase()) ||
        (contactData.phone && contact.phone && contact.phone === contactData.phone)
      );

      if (existingContactIndex !== -1) {
        // Update existing contact
        const updatedContact = {
          ...contacts[existingContactIndex],
          name: contactData.name || contacts[existingContactIndex].name,
          email: contactData.email || contacts[existingContactIndex].email,
          phone: contactData.phone || contacts[existingContactIndex].phone,
          linkedin: contactData.linkedin || contacts[existingContactIndex].linkedin || '',
          instagram: contactData.instagram || contacts[existingContactIndex].instagram || ''
        };

        setContacts(prevContacts => {
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

      // Add new contact if it doesn't exist
      const newContact = {
        id: Date.now().toString(),
        name: contactData.name || 'Unknown Contact',
        email: contactData.email || '',
        phone: contactData.phone || '',
        linkedin: contactData.linkedin || '',
        instagram: contactData.instagram || ''
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
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
  };

  // Get Started Screen Component
  const GetStartedScreen = () => (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.getStartedContainer}>
        <View style={[styles.getStartedContent, isDarkMode && styles.darkGetStartedContent]}>
          <View style={styles.logoContainer}>
            <View style={styles.qrIcon}>
              <Text style={styles.qrIconText}>QR</Text>
            </View>
            <Text style={[styles.appName, isDarkMode && styles.darkAppName]}>QRConnect</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>Get Started</Text>
            <Text style={[styles.description, isDarkMode && styles.darkDescription]}>
              Create your digital business card and start sharing your contact information instantly with QR codes.
            </Text>
          </View>
          
          <Pressable 
            style={({ pressed }) => [
              styles.getStartedButton,
              pressed && styles.getStartedButtonPressed
            ]}
            onPress={() => setCurrentScreen('profile')}
            accessibilityRole="button"
            accessibilityLabel="Get Started"
            accessibilityHint="Navigate to profile creation"
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

  // Profile Creation Screen Component
  const ProfileScreen = () => {
    const [localName, setLocalName] = useState(userProfile.name);
    const [localPhone, setLocalPhone] = useState(userProfile.phone);
    const [localEmail, setLocalEmail] = useState(userProfile.email);
    const [localLinkedin, setLocalLinkedin] = useState(userProfile.linkedin);
    const [localInstagram, setLocalInstagram] = useState(userProfile.instagram);
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => {
      const trimmedEmail = email.trim();
      if (trimmedEmail.length < 5) return false;
      if (!trimmedEmail.includes('@')) return false;
      
      const parts = trimmedEmail.split('@');
      if (parts.length !== 2) return false;
      
      const [username, domain] = parts;
      if (username.length === 0 || domain.length === 0) return false;
      if (!domain.includes('.')) return false;
      
      const domainParts = domain.split('.');
      if (domainParts.length < 2) return false;
      if (domainParts[domainParts.length - 1].length < 2) return false;
      
      return true;
    };

    const cleanPhoneNumber = (phone) => {
      let cleaned = '';
      for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (char === ' ' || char === '-' || char === '(' || char === ')') {
          continue;
        }
        cleaned += char;
      }
      return cleaned;
    };

    const isValidPhone = (phone) => {
      const cleanPhone = cleanPhoneNumber(phone);
      if (cleanPhone.length < 10) return false;
      if (cleanPhone.length > 15) return false;
      
      for (let i = 0; i < cleanPhone.length; i++) {
        const char = cleanPhone[i];
        if (i === 0 && char === '+') continue;
        if (char < '0' || char > '9') return false;
      }
      
      return true;
    };

    const validateFields = () => {
      const newErrors = {};
      
      if (!localName.trim()) {
        newErrors.name = 'Full name is required';
      }
      
      if (!localPhone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!isValidPhone(localPhone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      
      if (!localEmail.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!isValidEmail(localEmail)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      return newErrors;
    };

    const handleSave = () => {
      const validationErrors = validateFields();
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
        setUserProfile({ 
          name: localName.trim(), 
          phone: localPhone.trim(), 
          email: localEmail.trim(), 
          linkedin: localLinkedin.trim(), 
          instagram: localInstagram.trim()
        });
        setCurrentScreen('myqr');
      } else {
        Alert.alert('Required Fields Missing', 'Please fill in all required fields correctly.');
      }
    };

    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <ScrollView 
          style={styles.profileContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Create Your Profile</Text>
          
          <View style={styles.formContainer}>
            {/* Required Fields */}
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}>
                  Full Name
                </Text>
                <Text style={styles.requiredIndicator}> *</Text>
              </View>
              <TextInput
                style={[
                  styles.input, 
                  isDarkMode && styles.darkInput,
                  errors.name && styles.inputError
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                value={localName}
                onChangeText={(text) => {
                  setLocalName(text);
                  if (errors.name) {
                    setErrors(prev => ({ ...prev, name: null }));
                  }
                }}
                autoCorrect={false}
                autoCapitalize="words"
                textContentType="name"
                returnKeyType="next"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>
            
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}>
                  Phone Number
                </Text>
                <Text style={styles.requiredIndicator}> *</Text>
              </View>
              <TextInput
                style={[
                  styles.input, 
                  isDarkMode && styles.darkInput,
                  errors.phone && styles.inputError
                ]}
                placeholder="Enter your phone number"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                value={localPhone}
                onChangeText={(text) => {
                  setLocalPhone(text);
                  if (errors.phone) {
                    setErrors(prev => ({ ...prev, phone: null }));
                  }
                }}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoCorrect={false}
                returnKeyType="next"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>
            
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}>
                  Email Address
                </Text>
                <Text style={styles.requiredIndicator}> *</Text>
              </View>
              <TextInput
                style={[
                  styles.input, 
                  isDarkMode && styles.darkInput,
                  errors.email && styles.inputError
                ]}
                placeholder="Enter your email address"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                value={localEmail}
                onChangeText={(text) => {
                  setLocalEmail(text);
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: null }));
                  }
                }}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            
            {/* Optional Fields */}
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}>
                  LinkedIn Profile
                </Text>
                <Text style={[styles.optionalIndicator, isDarkMode && styles.darkOptionalIndicator]}> (optional)</Text>
              </View>
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="https://linkedin.com/in/yourprofile"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                value={localLinkedin}
                onChangeText={setLocalLinkedin}
                keyboardType="url"
                textContentType="URL"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}>
                  Instagram Handle
                </Text>
                <Text style={[styles.optionalIndicator, isDarkMode && styles.darkOptionalIndicator]}> (optional)</Text>
              </View>
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="@yourusername"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                value={localInstagram}
                onChangeText={setLocalInstagram}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // My QR Code Screen Component
  const MyQRScreen = () => {
    const qrData = JSON.stringify({
      name: userProfile.name || 'Your Name',
      phone: userProfile.phone || '',
      email: userProfile.email || '',
      linkedin: userProfile.linkedin || '',
      instagram: userProfile.instagram || ''
    });

    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.qrContainer}>
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>My QR Code</Text>
          
          <View style={styles.qrCodeContainer}>
            <View style={[styles.qrCodeWrapper, isDarkMode && styles.darkQrWrapper]}>
              <QRCode
                value={qrData}
                size={220}
                color={isDarkMode ? "#FFFFFF" : "#000000"}
                backgroundColor={isDarkMode ? "#1F2937" : "#FFFFFF"}
                logo={null}
              />
            </View>
            <Text style={[styles.qrCodeSubtext, isDarkMode && styles.darkSubtext]}>{userProfile.name || 'Your Name'}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  // Scan QR Screen Component
  const ScanQRScreen = () => {
    if (!permission) {
      return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
          <View style={styles.scanContainer}>
            <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Loading Camera...</Text>
          </View>
        </SafeAreaView>
      );
    }

    if (!permission.granted) {
      return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
          <View style={styles.scanContainer}>
            <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Camera Permission Required</Text>
            <Text style={[styles.scanInstructions, isDarkMode && styles.darkSubtext]}>
              We need camera access to scan QR codes.
            </Text>
            <TouchableOpacity 
              style={styles.scanAgainButton}
              onPress={requestPermission}
            >
              <Text style={styles.scanAgainButtonText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.scanContainer}>
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Scan QR Code</Text>
          
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.cameraView}
              facing="back"
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'],
              }}
            />
            <View style={styles.scanFrame}>
              <View style={styles.scanCorner} />
              <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
              <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
              <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
            </View>
          </View>
          
          <Text style={[styles.scanInstructions, isDarkMode && styles.darkSubtext]}>
            {scanned ? 'Tap to scan again' : 'Position the QR code within the frame to scan'}
          </Text>
          
          {scanned && (
            <TouchableOpacity 
              style={styles.scanAgainButton}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.scanAgainButtonText}>Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  // Helper function to extract LinkedIn username from URL
  const getLinkedInUsername = (linkedinUrl) => {
    if (!linkedinUrl) return '';
    
    // Remove trailing slash if present
    let url = linkedinUrl.trim().replace(/\/$/, '');
   
    // https://linkedin.com/in/username or linkedin.com/in/username
    const match = url.match(/linkedin\.com\/in\/([^\/\?]+)/i);
    if (match && match[1]) {
      return match[1];
    }
    
    // If it's already just a username (no URL), return it
    if (!url.includes('/') && !url.includes('.')) {
      return url;
    }
    
    // Fallback: return the original
    return linkedinUrl;
  };

  
  const ContactItem = memo(({ item, isDarkMode, onPress }) => (
    <TouchableOpacity 
      style={[styles.contactItem, isDarkMode && styles.darkContactItem]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.contactAvatar}>
        <Text style={styles.contactAvatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, isDarkMode && styles.darkText]}>{item.name}</Text>
        {item.email ? <Text style={[styles.contactEmail, isDarkMode && styles.darkSubtext]}>{item.email}</Text> : null}
        {item.phone ? <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>{item.phone}</Text> : null}
        {item.linkedin ? <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>LinkedIn: {getLinkedInUsername(item.linkedin)}</Text> : null}
        {item.instagram ? <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>Instagram: {item.instagram}</Text> : null}
      </View>
    </TouchableOpacity>
  ));


 
  const ContactDetailScreen = ({ contact, isDarkMode, onBack }) => {
    const copyToClipboard = (text, label) => {
      Clipboard.setString(text);
      Alert.alert('Copied', `${label} copied to clipboard`);
    };

    const handleDeleteContact = () => {
      Alert.alert(
        'Delete Contact',
        `Are you sure you want to delete ${contact.name}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setContacts(prevContacts => 
                prevContacts.filter(c => c.id !== contact.id)
              );
              Alert.alert('Contact Deleted', `${contact.name} has been removed from your contacts.`);
              onBack();
            }
          }
        ]
      );
    };

    const openLinkedIn = async (linkedinUrl) => {
      try {
       
        let url = linkedinUrl;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url;
        }
        
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Cannot open LinkedIn profile');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to open LinkedIn profile');
      }
    };

    const openInstagram = async (instagramHandle) => {
      try {
       
        let handle = instagramHandle.replace('@', '');
        
        
        const appUrl = `instagram://user?username=${handle}`;
        const canOpenApp = await Linking.canOpenURL(appUrl);
        
        if (canOpenApp) {
          await Linking.openURL(appUrl);
        } else {
          
          const webUrl = `https://instagram.com/${handle}`;
          await Linking.openURL(webUrl);
        }
      } catch (error) {
      
        try {
          let handle = instagramHandle.replace('@', '');
          const webUrl = `https://instagram.com/${handle}`;
          await Linking.openURL(webUrl);
        } catch (webError) {
          Alert.alert('Error', 'Failed to open Instagram profile');
        }
      }
    };

    const openEmail = async (emailAddress) => {
      try {
        const emailUrl = `mailto:${emailAddress}`;
        const canOpen = await Linking.canOpenURL(emailUrl);
        
        if (canOpen) {
          await Linking.openURL(emailUrl);
        } else {
          Alert.alert('Error', 'Cannot open email app');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to open email app');
      }
    };

    const openPhone = async (phoneNumber) => {
      try {
        const phoneUrl = `tel:${phoneNumber}`;
        const canOpen = await Linking.canOpenURL(phoneUrl);
        
        if (canOpen) {
          await Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Error', 'Cannot open phone dialer');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to open phone dialer');
      }
    };

    const contactInfoItems = [
      { 
        icon: '📞', 
        label: 'Phone', 
        value: contact.phone, 
        displayValue: contact.phone,
        action: () => openPhone(contact.phone),
        onLongPress: () => copyToClipboard(contact.phone, 'Phone number')
      },
      { 
        icon: '✉️', 
        label: 'Email', 
        value: contact.email, 
        displayValue: contact.email,
        action: () => openEmail(contact.email),
        onLongPress: () => copyToClipboard(contact.email, 'Email address')
      },
      { 
        icon: '💼', 
        label: 'LinkedIn', 
        value: contact.linkedin, 
        displayValue: getLinkedInUsername(contact.linkedin),
        action: () => openLinkedIn(contact.linkedin),
        onLongPress: () => copyToClipboard(contact.linkedin, 'LinkedIn profile')
      },
      { 
        icon: '📷', 
        label: 'Instagram', 
        value: contact.instagram, 
        displayValue: contact.instagram,
        action: () => openInstagram(contact.instagram),
        onLongPress: () => copyToClipboard(contact.instagram, 'Instagram handle')
      }
    ].filter(item => item.value);

    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <ScrollView style={styles.contactDetailContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.contactDetailHeader}>
            <TouchableOpacity 
              style={[styles.backButton, isDarkMode && styles.darkBackButton]}
              onPress={onBack}
            >
              <Text style={[styles.backButtonText, isDarkMode && styles.darkBackButtonText]}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.screenTitle, isDarkMode && styles.darkText, { flex: 1, textAlign: 'center', marginVertical: 0 }]}>
              Contact Details
            </Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={[styles.contactCard, isDarkMode && styles.darkContactCard]}>
            <View style={[styles.contactCardHeader, isDarkMode && styles.darkContactCardHeader]}>
              <View style={styles.contactDetailAvatar}>
                <Text style={styles.contactDetailAvatarText}>
                  {contact.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.contactDetailName, isDarkMode && styles.darkContactDetailName]}>
                {contact.name}
              </Text>
              <Text style={[styles.contactDetailRole, isDarkMode && styles.darkContactDetailRole]}>
                Contact
              </Text>
            </View>

            <View style={styles.contactInfoSection}>
              {contactInfoItems.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.contactInfoItem, 
                    isDarkMode && styles.darkContactInfoItem,
                    index === contactInfoItems.length - 1 && { borderBottomWidth: 0 }
                  ]}
                  onPress={item.action}
                  onLongPress={item.onLongPress}
                  activeOpacity={0.7}
                >
                  <View style={[styles.contactInfoIcon, isDarkMode && styles.darkContactInfoIcon]}>
                    <Text style={styles.contactInfoIconText}>{item.icon}</Text>
                  </View>
                  <View style={styles.contactInfoContent}>
                    <Text style={[styles.contactInfoLabel, isDarkMode && styles.darkContactInfoLabel]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.contactInfoValue, isDarkMode && styles.darkContactInfoValue]}>
                      {item.displayValue || item.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={handleDeleteContact}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteButtonText}>🗑️ Delete Contact</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  
  const ContactsScreen = memo(({ contacts, isDarkMode }) => {
    
    const [searchQuery, setSearchQuery] = useState('');
    
   
    const filteredContacts = useMemo(() => {
      if (!searchQuery.trim()) return contacts;
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [contacts, searchQuery]);
    
  
    const handleSearchChange = useCallback((text) => {
      setSearchQuery(text);
    }, []);
    
    // Handle contact selection
    const handleContactPress = useCallback((contact) => {
      setSelectedContact(contact);
      setCurrentScreen('contactdetail');
    }, []);
    

    const renderContactItem = useCallback(({ item }) => (
      <ContactItem item={item} isDarkMode={isDarkMode} onPress={handleContactPress} />
    ), [isDarkMode, handleContactPress]);
    
    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.contactsContainer}>
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>My Contacts</Text>
          
          <TextInput
            style={[styles.searchInput, isDarkMode && styles.darkInput]}
            placeholder="Search contacts..."
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          
          {filteredContacts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, isDarkMode && styles.darkSubtext]}>
                {contacts.length === 0 ? 'No contacts found' : 'No matching contacts'}
              </Text>
              <Text style={[styles.emptySubtext, isDarkMode && styles.darkSubtext]}>
                {contacts.length === 0 ? 'Scan QR codes to add contacts' : 'Try a different search term'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id}
              renderItem={renderContactItem}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              windowSize={10}
              initialNumToRender={10}
              getItemLayout={null}
            />
          )}
        </View>
      </SafeAreaView>
    );
  });



  const ProfileEditScreen = () => {
    const [editName, setEditName] = useState(userProfile.name);
    const [editPhone, setEditPhone] = useState(userProfile.phone);
    const [editEmail, setEditEmail] = useState(userProfile.email);
    const [editLinkedin, setEditLinkedin] = useState(userProfile.linkedin);
    const [editInstagram, setEditInstagram] = useState(userProfile.instagram);

    const handleSave = () => {
      setUserProfile({ 
        name: editName, 
        phone: editPhone, 
        email: editEmail, 
        linkedin: editLinkedin, 
        instagram: editInstagram
      });
    };

    return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView 
        style={styles.profileContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Edit Profile</Text>
          <TouchableOpacity 
            style={styles.darkModeToggle}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Text style={styles.darkModeText}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Full Name"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editName}
            onChangeText={setEditName}
            autoCorrect={false}
            autoCapitalize="words"
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Phone Number"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editPhone}
            onChangeText={setEditPhone}
            keyboardType="phone-pad"
            autoCorrect={false}
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Email Address"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editEmail}
            onChangeText={setEditEmail}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="LinkedIn Profile"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editLinkedin}
            onChangeText={setEditLinkedin}
            autoCorrect={false}
            autoCapitalize="none"
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Instagram Handle"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editInstagram}
            onChangeText={setEditInstagram}
            autoCorrect={false}
            autoCapitalize="none"
          />
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  };

  // Bottom Navigation 
  const BottomNavigation = () => (
    <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'myqr' && styles.activeNavItem]}
        onPress={() => setCurrentScreen('myqr')}
      >
        <Image 
          source={require('./assets/myQR.png')} 
          style={[
            styles.navIconImage,
            isDarkMode && { tintColor: '#FFFFFF' }
          ]}
        />
        <Text style={[styles.navText, isDarkMode && styles.darkNavText, currentScreen === 'myqr' && styles.activeNavText]}>
          My QR
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'scan' && styles.activeNavItem]}
        onPress={() => setCurrentScreen('scan')}
      >
        <Image 
          source={require('./assets/scanQR.png')} 
          style={[
            styles.navIconImage,
            isDarkMode && { tintColor: '#FFFFFF' }
          ]}
        />
        <Text style={[styles.navText, isDarkMode && styles.darkNavText, currentScreen === 'scan' && styles.activeNavText]}>
          Scan
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'contacts' && styles.activeNavItem]}
        onPress={() => setCurrentScreen('contacts')}
      >
        <Image 
          source={require('./assets/myContacts.png')} 
          style={[
            styles.navIconImage,
            isDarkMode && { tintColor: '#FFFFFF' }
          ]}
        />
        <Text style={[styles.navText, isDarkMode && styles.darkNavText, currentScreen === 'contacts' && styles.activeNavText]}>
          Contacts
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'profileedit' && styles.activeNavItem]}
        onPress={() => setCurrentScreen('profileedit')}
      >
        <Image 
          source={require('./assets/profile.png')} 
          style={[
            styles.navIconImage,
            isDarkMode && { tintColor: '#FFFFFF' }
          ]}
        />
        <Text style={[styles.navText, isDarkMode && styles.darkNavText, currentScreen === 'profileedit' && styles.activeNavText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );

  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <GetStartedScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'myqr':
        return <MyQRScreen />;
      case 'scan':
        return <ScanQRScreen />;
      case 'contacts':
        return <ContactsScreen contacts={contacts} isDarkMode={isDarkMode} />;
      case 'contactdetail':
        return selectedContact ? (
          <ContactDetailScreen 
            contact={selectedContact} 
            isDarkMode={isDarkMode} 
            onBack={() => {
              setSelectedContact(null);
              setCurrentScreen('contacts');
            }}
          />
        ) : <ContactsScreen contacts={contacts} isDarkMode={isDarkMode} />;
      case 'profileedit':
        return <ProfileEditScreen />;
      default:
        return <GetStartedScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.app}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        {renderScreen()}
        {currentScreen !== 'welcome' && currentScreen !== 'profile' && currentScreen !== 'contactdetail' && <BottomNavigation />}
      </View>
    </SafeAreaProvider>
  );
}