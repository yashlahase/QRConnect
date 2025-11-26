import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList } from 'react-native';
import { styles } from '../styles';
import ContactItem from '../components/ContactItem';

const ContactsScreen = ({ contacts, isDarkMode, onSelectContact }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    const lower = searchQuery.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lower) ||
        contact.email.toLowerCase().includes(lower)
    );
  }, [contacts, searchQuery]);

  const handleSearchChange = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const handleContactPress = useCallback(
    (contact) => {
      onSelectContact(contact);
    },
    [onSelectContact]
  );

  const renderContactItem = useCallback(
    ({ item }) => (
      <ContactItem item={item} isDarkMode={isDarkMode} onPress={handleContactPress} />
    ),
    [isDarkMode, handleContactPress]
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.contactsContainer}>
        <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>
          My Contacts
        </Text>

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
              {contacts.length === 0
                ? 'No contacts found'
                : 'No matching contacts'}
            </Text>
            <Text style={[styles.emptySubtext, isDarkMode && styles.darkSubtext]}>
              {contacts.length === 0
                ? 'Scan QR codes to add contacts'
                : 'Try a different search term'}
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
};

export default React.memo(ContactsScreen);