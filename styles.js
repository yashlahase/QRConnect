import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Grayish-Black Dark Theme Colors
const colors = {
  // Light theme colors
  primary: '#3B82F6',
  secondary: '#EF4444',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#D1D5DB',
  
  // Modern Grayish-Black Dark theme colors
  dark: {
    background: '#0F0F0F',      // Very dark gray instead of pure black
    surface: '#1A1A1A',         // Elevated surfaces (cards, inputs, nav bars)
    text: '#FFFFFF',            // High contrast white text
    textSecondary: '#B3B3B3',   // Lighter secondary text
    textMuted: '#8A8A8A',       // Muted text with better contrast
    border: '#333333',          // Lighter gray borders for better definition
  }
};

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  statusBar: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: colors.dark.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },

  // Welcome Screen Styles
  welcomeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  qrIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
  },
  authButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: '#3B82F6',
  },
  googleButton: {
    backgroundColor: '#EF4444',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  appleButtonText: {
    color: 'white',
  },

  // Profile Screen Styles
  profileContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginVertical: 30,
  },
  darkText: {
    color: colors.dark.text,
  },
  darkSubtext: {
    color: colors.dark.textSecondary,
  },
  formContainer: {
    gap: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
  },
  darkInput: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    color: colors.dark.text,
  },
  saveButton: {
    height: 50,
    backgroundColor: '#3B82F6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // My QR Screen Styles
  qrContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  darkQrWrapper: {
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: colors.dark.border,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  qrCodeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 10,
  },
  qrCodeSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  qrButtonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  qrActionButton: {
    flex: 1,
    height: 45,
    backgroundColor: '#3B82F6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrActionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Scan QR Screen Styles
  scanContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraView: {
    width: width - 40,
    height: width - 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cameraText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cameraSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  scanFrame: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: '50%',
    left: '50%',
    marginTop: -100,
    marginLeft: -100,
  },
  scanCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#3B82F6',
    top: 0,
    left: 0,
  },
  scanCornerTopRight: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
    top: 0,
    right: 0,
    left: 'auto',
  },
  scanCornerBottomLeft: {
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
    bottom: 0,
    top: 'auto',
    left: 0,
  },
  scanCornerBottomRight: {
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
  },
  scanInstructions: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  scanAgainButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Contacts Screen Styles
  contactsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 22,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
    color: '#1F2937',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  darkContactItem: {
    borderBottomColor: colors.dark.border,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactAvatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  darkBottomNav: {
    backgroundColor: colors.dark.surface,
    borderTopColor: colors.dark.border,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeNavItem: {
    // Active state styling handled by text color
  },
  navIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  navIconImage: {
    width: 24,
    height: 24,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  navIconText: {
    fontSize: 18,
  },
  navText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  darkNavText: {
    color: colors.dark.textMuted,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  darkModeToggle: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  darkModeToggleDark: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderWidth: 1,
  },
  darkModeText: {
    fontSize: 20,
  },
  activeNavText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});