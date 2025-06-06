// screens/SignUp.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Button from '../components/Base/Button';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export default function SignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignUp = () => {
    if (!termsAccepted) {
      Alert.alert('Terms & Conditions', 'You must accept the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', `Account created for ${email}`);
    // Add your signup logic here
  };

  const handleFacebookSignUp = () => {
    Alert.alert('Facebook Sign Up', 'Facebook sign up clicked');
    // Connect your Facebook auth here
  };

  const handleGoogleSignUp = () => {
    Alert.alert('Google Sign Up', 'Google sign up clicked');
    // Connect your Google auth here
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0D6EFD" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        {/* Password input with toggle */}
        <View style={styles.passwordInputWrapper}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            style={[styles.input, { flex: 1, marginBottom: 0, paddingHorizontal: 8 }]}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Confirm password input with toggle */}
        <View style={styles.passwordInputWrapper}>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
            autoCapitalize="none"
            style={[styles.input, { flex: 1, marginBottom: 0, paddingHorizontal: 8 }]}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Terms acceptance */}
        <TouchableOpacity
          style={styles.termsWrapper}
          onPress={() => setTermsAccepted(!termsAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms and Conditions</Text>
          </Text>
        </TouchableOpacity>

        <Button title="Sign Up" onPress={handleSignUp} style={styles.button} />

        {/* Social buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
            onPress={handleFacebookSignUp}
          >
            <Ionicons name="logo-facebook" size={24} color="white" />
            <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleSignUp}
          >
            <Ionicons name="logo-google" size={24} color="white" />
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    color: '#0D6EFD',
    fontSize: 18,
    marginLeft: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D6EFD',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 24,
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
  button: {
    marginTop: 8,
  },
  socialButtonsContainer: {
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
  },
});
