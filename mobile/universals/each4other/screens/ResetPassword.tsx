import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/Base/Input';

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
};

export default function ResetPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>>();

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOtpChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleReset = () => {
    if (otp.some(digit => digit === '')) {
      Alert.alert('Error', 'Please enter the 4-digit OTP.');
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // TODO: API call to verify OTP and reset password

    Alert.alert('Success', 'Your password has been reset.');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.backIconWrapper}
        >
          <Ionicons name="arrow-back" size={28} color="#0D6EFD" />
        </TouchableOpacity>
        <Text style={styles.title}>Reset Password</Text>
      </View>

      <Text style={styles.otpLabel}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={text => handleOtpChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            autoFocus={index === 0}
            placeholderTextColor="#999"
          />
        ))}
      </View>

      <View style={styles.inputWrapper}>
        <Input
          placeholder="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Input
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 70 : 40,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  backIconWrapper: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D6EFD',
    textAlign: 'center',
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0', // light gray background to match Input style
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 24,
    color: '#000',
    textAlignVertical: 'center',
  },
  inputWrapper: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    width: '100%',
  },
  resetButton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});
