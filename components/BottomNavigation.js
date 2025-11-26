import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../styles';

const BottomNavigation = ({ currentScreen, isDarkMode, onChangeScreen }) => (
  <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
    <TouchableOpacity
      style={[styles.navItem, currentScreen === 'myqr' && styles.activeNavItem]}
      onPress={() => onChangeScreen('myqr')}
    >
      <Image
        source={require('../assets/myQR.png')}
        style={[
          styles.navIconImage,
          isDarkMode && { tintColor: '#FFFFFF' },
        ]}
      />
      <Text
        style={[
          styles.navText,
          isDarkMode && styles.darkNavText,
          currentScreen === 'myqr' && styles.activeNavText,
        ]}
      >
        My QR
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.navItem, currentScreen === 'scan' && styles.activeNavItem]}
      onPress={() => onChangeScreen('scan')}
    >
      <Image
        source={require('../assets/scanQR.png')}
        style={[
          styles.navIconImage,
          isDarkMode && { tintColor: '#FFFFFF' },
        ]}
      />
      <Text
        style={[
          styles.navText,
          isDarkMode && styles.darkNavText,
          currentScreen === 'scan' && styles.activeNavText,
        ]}
      >
        Scan
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.navItem,
        currentScreen === 'contacts' && styles.activeNavItem,
      ]}
      onPress={() => onChangeScreen('contacts')}
    >
      <Image
        source={require('../assets/myContacts.png')}
        style={[
          styles.navIconImage,
          isDarkMode && { tintColor: '#FFFFFF' },
        ]}
      />
      <Text
        style={[
          styles.navText,
          isDarkMode && styles.darkNavText,
          currentScreen === 'contacts' && styles.activeNavText,
        ]}
      >
        Contacts
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.navItem,
        currentScreen === 'profileedit' && styles.activeNavItem,
      ]}
      onPress={() => onChangeScreen('profileedit')}
    >
      <Image
        source={require('../assets/profile.png')}
        style={[
          styles.navIconImage,
          isDarkMode && { tintColor: '#FFFFFF' },
        ]}
      />
      <Text
        style={[
          styles.navText,
          isDarkMode && styles.darkNavText,
          currentScreen === 'profileedit' && styles.activeNavText,
        ]}
      >
        Profile
      </Text>
    </TouchableOpacity>
  </View>
);

export default BottomNavigation;