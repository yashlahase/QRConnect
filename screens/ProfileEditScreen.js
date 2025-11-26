import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles';

const ProfileEditScreen = ({
  userProfile,
  setUserProfile,
  isDarkMode,
  setIsDarkMode,
}) => {
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
      instagram: editInstagram,
    });
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView
        style={styles.profileContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>
            Edit Profile
          </Text>
          <TouchableOpacity
            style={styles.darkModeToggle}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Text style={styles.darkModeText}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;