import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Input from '../components/Base/Input';
import Button from '../components/Base/Button';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

export default function SignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>();

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
      `Name: ${name}\nEmail: ${email}\nAge: ${age}\nPhone: ${phone}\nCity: ${city}\nGender: ${gender}\nReferral: ${referralCode}\nAnswer: ${randomQuestionAnswer}`
    );
    navigation.navigate('Home');
  };

  const handleTermsPress = () => {
    Alert.alert('Terms and Conditions', 'Show terms and conditions here.');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <View style={styles.backButtonCircle}>
          <Ionicons name="arrow-back" size={24} color="#0D6EFD" />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

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

      <View style={styles.orSeparator}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <Input
        placeholder="Name"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

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

      <View style={styles.passwordInputWrapper}>
        <Input
          placeholder="Repeat Password"
          secureTextEntry={!repeatPasswordVisible}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          autoCapitalize="none"
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            marginBottom: 0,
            paddingHorizontal: 4,
          }}
        />
        <TouchableOpacity
          onPress={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons name={repeatPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <Input
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />

      <Input
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <Input
        placeholder="City"
        autoCapitalize="words"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      {/* Gender Selector */}
      <View style={styles.genderWrapper}>
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.genderButtonsRow}>
          {['Male', 'Female', 'Other'].map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.genderButton,
                gender === g && styles.genderButtonSelected,
              ]}
              onPress={() => setGender(g as 'Male' | 'Female' | 'Other')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  gender === g && styles.genderButtonTextSelected,
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
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.avatarButton, avatarChosen && styles.avatarChosen]}
        onPress={handleChooseAvatar}
        activeOpacity={0.7}
      >
        <Text style={styles.avatarButtonText}>
          {avatarChosen ? 'Avatar Chosen ✓' : 'Choose Avatar'}
        </Text>
      </TouchableOpacity>

      <Input
        placeholder="Random question: What is your favorite color?"
        autoCapitalize="none"
        value={randomQuestionAnswer}
        onChangeText={setRandomQuestionAnswer}
        style={styles.input}
      />

      <View style={styles.termsWrapper}>
        <TouchableOpacity
          onPress={() => setTermsAccepted(!termsAccepted)}
          style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
          activeOpacity={0.7}
        >
          {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          I agree to the{' '}
          <Text style={styles.linkText} onPress={handleTermsPress}>
            Terms and Conditions
          </Text>
        </Text>
      </View>

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        style={styles.loginButton}
        textStyle={styles.loginButtonText}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginRedirectWrapper}
        activeOpacity={0.7}
      >
        <Text style={styles.loginRedirectText}>
          Already have an account?{' '}
          <Text style={styles.loginRedirectLink}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    top: Platform.OS === 'ios' ? 40 : 20,
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
    marginTop: 120,
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
  orSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
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
  loginButton: {
    width: '100%',
    marginBottom: 12,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
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
