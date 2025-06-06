import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/Base/Input';
import Button from '../components/Base/Button';

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook login pressed');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login pressed');
  };

  const handleLogin = () => {
    if (!termsAccepted) {
      Alert.alert('Terms & Conditions', 'You must accept the terms and conditions.');
      return;
    }
    Alert.alert('Log in', `Email: ${email}\nPassword: ${password}`);
  };

  const OrSeparator = () => (
    <View style={styles.orContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
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
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordWrapper}>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Log in"
          onPress={handleLogin}
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
        />

        {/* Sign up text below the button, aligned to start */}
        <View style={styles.signUpTextWrapper}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.signUpText, styles.signUpLink]}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.termsWrapper}
          onPress={() => setTermsAccepted(!termsAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.linkText}>Terms and Conditions</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
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
    justifyContent: 'flex-start',
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
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
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
  termsText: {
    fontSize: 14,
    color: '#555',
  },
  linkText: {
    color: '#0D6EFD',
    textDecorationLine: 'underline',
  },
});
