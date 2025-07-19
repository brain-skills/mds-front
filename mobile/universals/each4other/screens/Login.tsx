import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Animated, TouchableWithoutFeedback, Easing, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/Base/Input';
import Button from '../components/Base/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreenWrapper from '../components/AuthScreenWrapper';

const ANIMATION_DURATION = 300;
const OVERLAY_OPACITY = 0.5;
const MODAL_INITIAL_TRANSLATE_Y = 300;

const USER_TYPE_OPTIONS = ['User', 'Creator', 'Company / Self'];
const COMPANY_SELF_OPTION = 'Company / Self';
const COMPANY_OPTION = 'Company';
const SELF_EMPLOYER_OPTION = 'Self Employer';

type RootStackParamList = {
  Login: undefined;
  SignUp: { userType?: string };
  MainMenu: undefined;
  ForgotPassword: undefined;
  Profile: undefined;
};

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [userType, setUserType] = useState('');

  const slideAnim = useRef(new Animated.Value(MODAL_INITIAL_TRANSLATE_Y)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const secondSlideAnim = useRef(new Animated.Value(MODAL_INITIAL_TRANSLATE_Y)).current;

  const animateFirstModal = useCallback((visible: boolean) => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : MODAL_INITIAL_TRANSLATE_Y,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? OVERLAY_OPACITY : 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!visible) setModalVisible(false);
    });
  }, [slideAnim, overlayOpacity]);

  useEffect(() => {
    if (modalVisible) {
      slideAnim.setValue(MODAL_INITIAL_TRANSLATE_Y);
      overlayOpacity.setValue(0);
      animateFirstModal(true);
    } else {
      animateFirstModal(false);
    }
  }, [modalVisible, animateFirstModal, slideAnim, overlayOpacity]);

  useEffect(() => {
    if (secondModalVisible) {
      Keyboard.dismiss();
      Animated.timing(secondSlideAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(secondSlideAnim, {
        toValue: MODAL_INITIAL_TRANSLATE_Y,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [secondModalVisible, secondSlideAnim]);

  const handleOptionSelect = (option: string) => {
    if (option === COMPANY_SELF_OPTION) {
      animateFirstModal(false);
      setTimeout(() => setSecondModalVisible(true), ANIMATION_DURATION / 2);
    } else {
      animateFirstModal(false);
      navigation.navigate('SignUp', { userType: option });
    }
  };

  const handleSecondOptionSelect = (option: string) => {
    setUserType(option);
    setSecondModalVisible(false);
    navigation.navigate('SignUp', { userType: option });
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('MainMenu');
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred while logging in. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleSignUpPress = () => setModalVisible(true);

  const handleFacebookLogin = () => Alert.alert('Facebook Login', 'Facebook login pressed');

  const handleGoogleLogin = () => Alert.alert('Google Login', 'Google login pressed');

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
      navigation.navigate('MainMenu');
    }
  };

  return (
    <AuthScreenWrapper
      title="Sign In"
      onFacebookPress={handleFacebookLogin}
      onGooglePress={handleGoogleLogin}
    >
      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        accessibilityLabel="Email input field"
      />

      <View style={styles.passwordInputWrapper}>
        <Input
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          style={styles.passwordInput}
          accessibilityLabel="Password input field"
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
          accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
        >
          <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPasswordWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          accessibilityLabel="Forgot password link"
        >
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
        <TouchableOpacity onPress={handleSignUpPress} accessibilityLabel="Sign up link">
          <Text style={[styles.signUpText, styles.signUpLink]}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => animateFirstModal(false)}
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={() => animateFirstModal(false)}>
          <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.modalTitle}>Registration like who?</Text>
          {USER_TYPE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.modalItem}
              onPress={() => handleOptionSelect(option)}
              accessibilityLabel={`Register as ${option}`}
            >
              <Text style={styles.modalItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => animateFirstModal(false)}
            style={styles.modalCloseButton}
            accessibilityLabel="Cancel registration type selection"
          >
            <Text style={styles.modalCloseButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      <Modal
        transparent
        visible={secondModalVisible}
        onRequestClose={() => setSecondModalVisible(false)}
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={() => setSecondModalVisible(false)}>
          <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY: secondSlideAnim }] }]}
        >
          <Text style={styles.modalTitle}>Select your type:</Text>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleSecondOptionSelect(COMPANY_OPTION)}
            accessibilityLabel={`Select ${COMPANY_OPTION}`}
          >
            <Text style={styles.modalItemText}>{COMPANY_OPTION}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleSecondOptionSelect(SELF_EMPLOYER_OPTION)}
            accessibilityLabel={`Select ${SELF_EMPLOYER_OPTION}`}
          >
            <Text style={styles.modalItemText}>{SELF_EMPLOYER_OPTION}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSecondModalVisible(false)}
            style={styles.modalCloseButton}
            accessibilityLabel="Cancel company/self employer selection"
          >
            <Text style={styles.modalCloseButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 16,
  },
  passwordInputWrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 0,
    paddingHorizontal: 4,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordWrapper: {
    marginTop: 8,
    alignItems: 'flex-end',
    width: '100%',
  },
  forgotPasswordText: {
    color: '#0D6EFD',
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: '#0D6EFD',
    borderRadius: 10,
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  signUpTextWrapper: {
    flexDirection: 'row',
    marginTop: 12,
  },
  signUpText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    color: '#0D6EFD',
    fontWeight: 'bold',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000080',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D6EFD',
    marginBottom: 20,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});