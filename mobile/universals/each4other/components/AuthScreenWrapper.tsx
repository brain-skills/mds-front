import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewProps,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  [key: string]: undefined | object;
};

interface AuthScreenWrapperProps extends ViewProps {
  title: string;
  children: React.ReactNode;
  showSocialButtons?: boolean;
  onFacebookPress?: () => void;
  onGooglePress?: () => void;
  showOrSeparator?: boolean;
}

const AuthScreenWrapper: React.FC<AuthScreenWrapperProps> = ({
  title,
  children,
  showSocialButtons = true,
  onFacebookPress,
  onGooglePress,
  showOrSeparator = true,
  style,
  ...rest
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const OrSeparator = React.memo(() => (
    <View style={wrapperStyles.orContainer}>
      <View style={wrapperStyles.line} />
      <Text style={wrapperStyles.orText}>or</Text>
      <View style={wrapperStyles.line} />
    </View>
  ));

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[wrapperStyles.container, style]}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={20}
      enableAutomaticScroll={true}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      <TouchableOpacity
        style={wrapperStyles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        accessibilityLabel="Go back"
      >
        <View style={wrapperStyles.backButtonCircle}>
          <Ionicons name="arrow-back" size={24} color="#0D6EFD" />
        </View>
      </TouchableOpacity>

      <Text style={wrapperStyles.title}>{title}</Text>

      {showSocialButtons && (
        <View style={wrapperStyles.socialButtonsRow}>
          <TouchableOpacity
            style={[wrapperStyles.socialButton, { marginRight: 8 }]}
            onPress={onFacebookPress}
            accessibilityLabel="Login with Facebook"
          >
            <View style={wrapperStyles.socialButtonContent}>
              <FontAwesome name="facebook-f" size={20} color="#1877F2" />
              <Text style={wrapperStyles.socialButtonText}>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[wrapperStyles.socialButton, { marginLeft: 8 }]}
            onPress={onGooglePress}
            accessibilityLabel="Login with Google"
          >
            <View style={wrapperStyles.socialButtonContent}>
              <FontAwesome name="google" size={20} color="#DB4437" />
              <Text style={wrapperStyles.socialButtonText}>Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {showOrSeparator && <OrSeparator />}

      {children}
    </KeyboardAwareScrollView>
  );
};

const wrapperStyles = StyleSheet.create({
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
    marginLeft: 0,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 12,
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AuthScreenWrapper;