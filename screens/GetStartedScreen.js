import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles';

const GetStartedScreen = ({ isDarkMode, onGetStarted }) => (
  <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
    <View style={styles.getStartedContainer}>
      <View
        style={[
          styles.getStartedContent,
          isDarkMode && styles.darkGetStartedContent,
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.qrIcon}>
            <Text style={styles.qrIconText}>QR</Text>
          </View>
          <Text style={[styles.appName, isDarkMode && styles.darkAppName]}>
            QRConnect
          </Text>
          <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
            Get Started
          </Text>
          <Text
            style={[styles.description, isDarkMode && styles.darkDescription]}
          >
            Create your digital business card and start sharing your contact
            information instantly with QR codes.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.getStartedButton,
            pressed && styles.getStartedButtonPressed,
          ]}
          onPress={onGetStarted}
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

export default GetStartedScreen;