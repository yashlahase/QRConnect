import React, { memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from '../styles';
import { getLinkedInUsername } from '../utils/getLinkedInUsername';

const ContactItem = ({ item, isDarkMode, onPress }) => (
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
      <Text style={[styles.contactName, isDarkMode && styles.darkText]}>
        {item.name}
      </Text>
      {item.email ? (
        <Text style={[styles.contactEmail, isDarkMode && styles.darkSubtext]}>
          {item.email}
        </Text>
      ) : null}
      {item.phone ? (
        <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>
          {item.phone}
        </Text>
      ) : null}
      {item.linkedin ? (
        <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>
          LinkedIn: {getLinkedInUsername(item.linkedin)}
        </Text>
      ) : null}
      {item.instagram ? (
        <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>
          Instagram: {item.instagram}
        </Text>
      ) : null}
    </View>
  </TouchableOpacity>
);

export default memo(ContactItem);