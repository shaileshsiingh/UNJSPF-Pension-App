import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { auth } from '../firebaseConfig'; // Adjust the path as needed
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const GoogleSignInModal = ({ visible, onClose, onLoginSuccess, onLoginError }) => {
  const provider = new GoogleAuthProvider();

  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.includes('__auth/handler')) {
      const params = new URL(url).searchParams;
      const idToken = params.get('id_token');
      const accessToken = params.get('access_token');

      if (idToken && accessToken) {
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            onLoginSuccess(userCredential.user);
          })
          .catch((error) => {
            onLoginError(error);
          });
      } else {
        onLoginError(new Error('Failed to get tokens from Google Auth handler.'));
      }
      onClose();
    }
  };

  // This is a simplified example. You'll need to construct the correct Google Sign-In URL.
  // You might need to use a library like `expo-auth-session` to get the correct URL.
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20email&response_type=token&client_id=343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com&redirect_uri=localhost:8081`;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <WebView
            source={{ uri: googleSignInUrl }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            style={{ flex: 1, width: '100%' }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GoogleSignInModal;
