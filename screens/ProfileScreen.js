import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles';

const ProfileScreen = ({
  userProfile,
  setUserProfile,
  isDarkMode,
  onProfileCompleted,
}) => {
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
        instagram: localInstagram.trim(),
      });
      onProfileCompleted();
    } else {
      Alert.alert(
        'Required Fields Missing',
        'Please fill in all required fields correctly.'
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView
        style={styles.profileContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>
          Create Your Profile
        </Text>

        <View style={styles.formContainer}>
          {/* Required Fields */}
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}
              >
                Full Name
              </Text>
              <Text style={styles.requiredIndicator}> *</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                isDarkMode && styles.darkInput,
                errors.name && styles.inputError,
              ]}
              placeholder="Enter your full name"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localName}
              onChangeText={(text) => {
                setLocalName(text);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: null }));
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
              <Text
                style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}
              >
                Phone Number
              </Text>
              <Text style={styles.requiredIndicator}> *</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                isDarkMode && styles.darkInput,
                errors.phone && styles.inputError,
              ]}
              placeholder="Enter your phone number"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localPhone}
              onChangeText={(text) => {
                setLocalPhone(text);
                if (errors.phone) {
                  setErrors((prev) => ({ ...prev, phone: null }));
                }
              }}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}
              >
                Email Address
              </Text>
              <Text style={styles.requiredIndicator}> *</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                isDarkMode && styles.darkInput,
                errors.email && styles.inputError,
              ]}
              placeholder="Enter your email address"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={localEmail}
              onChangeText={(text) => {
                setLocalEmail(text);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: null }));
                }
              }}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Optional Fields */}
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}
              >
                LinkedIn Profile
              </Text>
              <Text
                style={[
                  styles.optionalIndicator,
                  isDarkMode && styles.darkOptionalIndicator,
                ]}
              >
                {' '}
                (optional)
              </Text>
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
              <Text
                style={[styles.inputLabel, isDarkMode && styles.darkInputLabel]}
              >
                Instagram Handle
              </Text>
              <Text
                style={[
                  styles.optionalIndicator,
                  isDarkMode && styles.darkOptionalIndicator,
                ]}
              >
                {' '}
                (optional)
              </Text>
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;