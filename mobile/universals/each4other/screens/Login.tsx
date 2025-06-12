import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '../components/Base/Input';
import Button from '../components/Base/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainMenu: undefined;
  ForgotPassword: undefined;
  Profile: undefined
};

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(300)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const registrationOptions = ['User', 'Creator', 'Advertiser', 'Business', 'Blogger'];

  useEffect(() => {
    animateModal(modalVisible);
  }, [modalVisible]);

  const animateModal = (visible: boolean) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : 300,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!visible) setModalVisible(false);
    });
  };

  const openModal = () => {
    setModalVisible(true);
    slideAnim.setValue(300);
    overlayOpacity.setValue(0);
  };

  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook login pressed');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login pressed');
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('MainMenu');
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred while logging in.');
      console.error('Login error:', error);
    }
  };
  
  const handleSignUpPress = () => {
    openModal();
  };

  const handleOptionSelect = (option: string) => {
    animateModal(false);
    navigation.navigate('SignUp');
  };
  const handleBackPress = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.goBack();
      } else {
        navigation.navigate('MainMenu');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      navigation.navigate('MainMenu'); // fallback
    }
  };

  const OrSeparator = () => (
    <View style={styles.orContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={20}
      enableAutomaticScroll={true}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        activeOpacity={0.7}
      >
        <View style={styles.backButtonCircle}>
          <Ionicons name="arrow-back" size={24} color="#0D6EFD" />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Sign In</Text>

      <View style={styles.socialButtonsRow}>
        <TouchableOpacity
          style={[styles.socialButton, { marginRight: 8 }]}
          onPress={handleFacebookLogin}
        >
          <View style={styles.socialButtonContent}>
            <FontAwesome name="facebook-f" size={20} color="#1877F2" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { marginLeft: 8 }]}
          onPress={handleGoogleLogin}
        >
          <View style={styles.socialButtonContent}>
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={styles.socialButtonText}>Google</Text>
          </View>
        </TouchableOpacity>
      </View>

      <OrSeparator />

      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={styles.passwordInputWrapper}>
        <Input
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            marginBottom: 0,
            paddingHorizontal: 4,
          }}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPasswordWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Log in"
        onPress={handleLogin}
        style={styles.loginButton}
        textStyle={styles.loginButtonText}
      />

      <View style={styles.signUpTextWrapper}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUpPress}>
          <Text style={[styles.signUpText, styles.signUpLink]}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => animateModal(false)}
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={() => animateModal(false)}>
          <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.modalTitle}>Registration like who?</Text>
          {registrationOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.modalItem}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.modalItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => animateModal(false)}
            style={styles.modalCloseButton}
          >
            <Text style={styles.modalCloseButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
  },
  backButtonCircle: {
    backgroundColor: '#e6f0ff',
    borderRadius: 24,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0D6EFD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D6EFD',
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    width: '100%',
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginHorizontal: 8,
  },
  input: {
    width: '100%',
    marginBottom: 12,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    width: '100%',
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0D6EFD',
    fontWeight: '600',
  },
  loginButton: {
    width: '100%',
    marginBottom: 12,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  signUpTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 24,
    paddingLeft: 4,
  },
  signUpText: {
    fontSize: 14,
    color: '#555',
  },
  signUpLink: {
    color: '#0D6EFD',
    fontWeight: '700',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: '#0D6EFD',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0D6EFD',
  },
  linkText: {
    color: '#0D6EFD',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000066',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D6EFD',
    marginBottom: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: '#0D6EFD',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
