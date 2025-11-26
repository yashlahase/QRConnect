import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '../styles';

const MyQRScreen = ({ userProfile, isDarkMode }) => {
  const qrData = JSON.stringify({
    name: userProfile.name || 'Your Name',
    phone: userProfile.phone || '',
    email: userProfile.email || '',
    linkedin: userProfile.linkedin || '',
    instagram: userProfile.instagram || '',
  });

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.qrContainer}>
        <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>
          My QR Code
        </Text>

        <View style={styles.qrCodeContainer}>
          <View style={[styles.qrCodeWrapper, isDarkMode && styles.darkQrWrapper]}>
            <QRCode
              value={qrData}
              size={220}
              color={isDarkMode ? '#FFFFFF' : '#000000'}
              backgroundColor={isDarkMode ? '#1F2937' : '#FFFFFF'}
              logo={null}
            />
          </View>
          <Text
            style={[styles.qrCodeSubtext, isDarkMode && styles.darkSubtext]}
          >
            {userProfile.name || 'Your Name'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyQRScreen;