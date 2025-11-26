import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { styles } from '../styles';

const ScanQRScreen = ({
  isDarkMode,
  scanned,
  setScanned,
  permission,
  requestPermission,
  onBarCodeScanned,
}) => {
  if (!permission) {
    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.scanContainer}>
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>
            Loading Camera...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.scanContainer}>
          <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>
            Camera Permission Required
          </Text>
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
        <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>
          Scan QR Code
        </Text>

        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.cameraView}
            facing="back"
            onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
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
          {scanned
            ? 'Tap to scan again'
            : 'Position the QR code within the frame to scan'}
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

export default ScanQRScreen;