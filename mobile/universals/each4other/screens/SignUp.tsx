// screens/SignUp.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native'; // Correct import for RouteProp

import Input from '../components/Base/Input';
import Button from '../components/Base/Button';
import AuthScreenWrapper from '../components/AuthScreenWrapper';

type RootStackParamList = {
  Login: undefined;
  SignUp: { userType?: string };
  MainMenu: undefined;
  Home: undefined;
};

type SignUpRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

export default function SignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>();
  const route = useRoute<SignUpRouteProp>();

  const userTypeFromParams = route.params?.userType;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
  const [referralCode, setReferralCode] = useState('');
  const [avatarChosen, setAvatarChosen] = useState(false);
  const [randomQuestionAnswer, setRandomQuestionAnswer] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook login pressed');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login pressed');
  };

  const handleChooseAvatar = () => {
    setAvatarChosen(true);
    Alert.alert('Avatar', 'Avatar chosen!');
  };

  const handleSignUp = () => {
    if (!termsAccepted) {
      Alert.alert('Terms & Conditions', 'You must accept the terms and conditions.');
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    if (!gender) {
      Alert.alert('Gender', 'Please select your gender.');
      return;
    }
    Alert.alert(
      'Sign up',
      `User Type: ${userTypeFromParams || 'Not specified'}\nName: ${name}\nEmail: ${email}\nAge: ${age}\nPhone: ${phone}\nCity: ${city}\nGender: ${gender}\nReferral: ${referralCode}\nAnswer: ${randomQuestionAnswer}`
    );
    navigation.navigate('MainMenu');
  };

  const handleTermsPress = () => {
    Alert.alert('Terms and Conditions', 'Show terms and conditions here.');
  };

  return (
    <AuthScreenWrapper
      title="Sign Up"
      onFacebookPress={handleFacebookLogin}
      onGooglePress={handleGoogleLogin}
      style={signUpStyles.container}
    >
      <Input
        placeholder="Name"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
        style={signUpStyles.input}
      />

      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={signUpStyles.input}
      />

      <View style={signUpStyles.passwordInputWrapper}>
        <Input
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          style={signUpStyles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={signUpStyles.eyeIcon}
        >
          <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={signUpStyles.passwordInputWrapper}>
        <Input
          placeholder="Repeat Password"
          secureTextEntry={!repeatPasswordVisible}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          autoCapitalize="none"
          style={signUpStyles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
          style={signUpStyles.eyeIcon}
        >
          <Ionicons name={repeatPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <Input
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={signUpStyles.input}
      />

      <Input
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={signUpStyles.input}
      />

      <Input
        placeholder="City"
        autoCapitalize="words"
        value={city}
        onChangeText={setCity}
        style={signUpStyles.input}
      />

      <View style={signUpStyles.genderWrapper}>
        <Text style={signUpStyles.genderLabel}>Gender</Text>
        <View style={signUpStyles.genderButtonsRow}>
          {['Male', 'Female', 'Other'].map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                signUpStyles.genderButton,
                gender === g && signUpStyles.genderButtonSelected,
              ]}
              onPress={() => setGender(g as 'Male' | 'Female' | 'Other')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  signUpStyles.genderButtonText,
                  gender === g && signUpStyles.genderButtonTextSelected,
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Input
        placeholder="Referral Code (optional)"
        autoCapitalize="characters"
        value={referralCode}
        onChangeText={setReferralCode}
        style={signUpStyles.input}
      />

      <TouchableOpacity
        style={[signUpStyles.avatarButton, avatarChosen && signUpStyles.avatarChosen]}
        onPress={handleChooseAvatar}
        activeOpacity={0.7}
      >
        <Text style={signUpStyles.avatarButtonText}>
          {avatarChosen ? 'Avatar Chosen ✓' : 'Choose Avatar'}
        </Text>
      </TouchableOpacity>

      <Input
        placeholder="Random question: What is your favorite color?"
        autoCapitalize="none"
        value={randomQuestionAnswer}
        onChangeText={setRandomQuestionAnswer}
        style={signUpStyles.input}
      />

      <View style={signUpStyles.termsWrapper}>
        <TouchableOpacity
          onPress={() => setTermsAccepted(!termsAccepted)}
          style={[signUpStyles.checkbox, termsAccepted && signUpStyles.checkboxChecked]}
          activeOpacity={0.7}
        >
          {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
        </TouchableOpacity>

        <Text style={signUpStyles.termsText}>
          I agree to the{' '}
          <Text style={signUpStyles.linkText} onPress={handleTermsPress}>
            Terms and Conditions
          </Text>
        </Text>
      </View>

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        style={signUpStyles.signUpButton}
        textStyle={signUpStyles.signUpButtonText}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={signUpStyles.loginRedirectWrapper}
        activeOpacity={0.7}
      >
        <Text style={signUpStyles.loginRedirectText}>
          Already have an account?{' '}
          <Text style={signUpStyles.loginRedirectLink}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </AuthScreenWrapper>
  );
}

const signUpStyles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 120 : 80,
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
  passwordInput: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 0,
    paddingHorizontal: 4,
  },
  eyeIcon: {
    padding: 8,
  },
  avatarButton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  avatarChosen: {
    backgroundColor: '#198754',
  },
  avatarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
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
  signUpButton: {
    width: '100%',
    marginBottom: 12,
    paddingVertical: 16,
    backgroundColor: '#0D6EFD',
    borderRadius: 10,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  loginRedirectWrapper: {
    marginTop: 12,
    alignItems: 'center',
    width: '100%',
  },
  loginRedirectText: {
    fontSize: 14,
    color: '#555',
  },
  loginRedirectLink: {
    color: '#0D6EFD',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  genderWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  genderLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  genderButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#0D6EFD',
    borderColor: '#0D6EFD',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#333',
  },
  genderButtonTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
});