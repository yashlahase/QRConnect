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
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userProfile, setUserProfile] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    instagram: '',
    website: ''
  });
  const [contacts, setContacts] = useState([]);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isDarkMode, setIsDarkMode] = useState(false);


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
          instagram: contactData.instagram || contacts[existingContactIndex].instagram || '',
          website: contactData.website || contacts[existingContactIndex].website || ''
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
        instagram: contactData.instagram || '',
        website: contactData.website || ''
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

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.qrIcon}>
            <Text style={styles.qrIconText}>QR</Text>
          </View>
          <Text style={styles.appName}>QRConnect</Text>
          <Text style={styles.tagline}>Share your contact instantly</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.authButton, styles.emailButton]}
            onPress={() => setCurrentScreen('profile')}
          >
            <Text style={styles.authButtonText}>Continue with Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.authButton, styles.googleButton]}
            onPress={() => setCurrentScreen('profile')}
          >
            <Text style={styles.authButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.authButton, styles.appleButton]}
            onPress={() => setCurrentScreen('profile')}
          >
            <Text style={[styles.authButtonText, styles.appleButtonText]}>Continue with Apple</Text>
          </TouchableOpacity>
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
    const [localWebsite, setLocalWebsite] = useState(userProfile.website);

    const handleSave = () => {
      setUserProfile({ 
        name: localName, 
        phone: localPhone, 
        email: localEmail, 
        linkedin: localLinkedin, 
        instagram: localInstagram, 
        website: localWebsite 
      });
      setCurrentScreen('myqr');
    };

    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <ScrollView 
          style={styles.profileContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Create Your Profile</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Full Name"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localName}
              onChangeText={setLocalName}
              autoCorrect={false}
              autoCapitalize="words"
              blurOnSubmit={false}
            />
            
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Phone Number"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localPhone}
              onChangeText={setLocalPhone}
              keyboardType="phone-pad"
              autoCorrect={false}
              blurOnSubmit={false}
            />
            
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Email Address"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localEmail}
              onChangeText={setLocalEmail}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
            />
            
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="LinkedIn Profile"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localLinkedin}
              onChangeText={setLocalLinkedin}
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
            />
            
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Instagram Handle"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localInstagram}
              onChangeText={setLocalInstagram}
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
            />
            
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Website URL"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localWebsite}
              onChangeText={setLocalWebsite}
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
            />
            
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
      instagram: userProfile.instagram || '',
      website: userProfile.website || ''
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
          
          <View style={styles.qrButtonContainer}>
            <TouchableOpacity 
              style={styles.qrActionButton}
              onPress={() => Alert.alert('Share', 'QR Code shared!')}
            >
              <Text style={styles.qrActionButtonText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.qrActionButton}
              onPress={() => Alert.alert('Save', 'QR Code saved to gallery!')}
            >
              <Text style={styles.qrActionButtonText}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.qrActionButton}
              onPress={() => Alert.alert('Copy', 'QR Code link copied!')}
            >
              <Text style={styles.qrActionButtonText}>Copy</Text>
            </TouchableOpacity>
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

  // Memoized Contact Item Component to prevent unnecessary re-renders
  const ContactItem = memo(({ item, isDarkMode }) => (
    <View style={[styles.contactItem, isDarkMode && styles.darkContactItem]}>
      <View style={styles.contactAvatar}>
        <Text style={styles.contactAvatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, isDarkMode && styles.darkText]}>{item.name}</Text>
        {item.email ? <Text style={[styles.contactEmail, isDarkMode && styles.darkSubtext]}>{item.email}</Text> : null}
        {item.phone ? <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>{item.phone}</Text> : null}
        {item.linkedin ? <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>LinkedIn: {item.linkedin}</Text> : null}
        {item.instagram ? <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>Instagram: {item.instagram}</Text> : null}
        {item.website ? <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>Website: {item.website}</Text> : null}
      </View>
    </View>
  ));


  // Contact List Screen Component with local search state
  const ContactsScreen = memo(({ contacts, isDarkMode }) => {
    // Local search state - isolated from parent component
    const [searchQuery, setSearchQuery] = useState('');
    
    // Memoized filtered contacts to prevent unnecessary recalculations
    const filteredContacts = useMemo(() => {
      if (!searchQuery.trim()) return contacts;
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [contacts, searchQuery]);
    
    // Memoized search handler to prevent function recreation
    const handleSearchChange = useCallback((text) => {
      setSearchQuery(text);
    }, []);
    
    // Memoized render function for FlatList items
    const renderContactItem = useCallback(({ item }) => (
      <ContactItem item={item} isDarkMode={isDarkMode} />
    ), [isDarkMode]);
    
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
            blurOnSubmit={false}
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

  // Profile Edit Screen Component
  const ProfileEditScreen = () => {
    const [editName, setEditName] = useState(userProfile.name);
    const [editPhone, setEditPhone] = useState(userProfile.phone);
    const [editEmail, setEditEmail] = useState(userProfile.email);
    const [editLinkedin, setEditLinkedin] = useState(userProfile.linkedin);
    const [editInstagram, setEditInstagram] = useState(userProfile.instagram);
    const [editWebsite, setEditWebsite] = useState(userProfile.website);

    const handleSave = () => {
      setUserProfile({ 
        name: editName, 
        phone: editPhone, 
        email: editEmail, 
        linkedin: editLinkedin, 
        instagram: editInstagram, 
        website: editWebsite 
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
            blurOnSubmit={false}
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Phone Number"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editPhone}
            onChangeText={setEditPhone}
            keyboardType="phone-pad"
            autoCorrect={false}
            blurOnSubmit={false}
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
            blurOnSubmit={false}
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="LinkedIn Profile"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editLinkedin}
            onChangeText={setEditLinkedin}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Instagram Handle"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editInstagram}
            onChangeText={setEditInstagram}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
          />
          
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Website URL"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={editWebsite}
            onChangeText={setEditWebsite}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
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

  // Bottom Navigation Component
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

  // Main render function
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'myqr':
        return <MyQRScreen />;
      case 'scan':
        return <ScanQRScreen />;
      case 'contacts':
        return <ContactsScreen contacts={contacts} isDarkMode={isDarkMode} />;
      case 'profileedit':
        return <ProfileEditScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.app}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        {renderScreen()}
        {currentScreen !== 'welcome' && currentScreen !== 'profile' && <BottomNavigation />}
      </View>
    </SafeAreaProvider>
  );
}