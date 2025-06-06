import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

type Props = {
  title: string;
  text: string;
  onFacebookPress: (event: GestureResponderEvent) => void;
  onGooglePress: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  onBottomButtonPress: (event: GestureResponderEvent) => void;
  bottomButtonLabel: string;
};

export default function AuthWrapper({
  title,
  text,
  onFacebookPress,
  onGooglePress,
  children,
  onBottomButtonPress,
  bottomButtonLabel,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={[styles.socialButton, styles.facebookButton]}
          onPress={onFacebookPress}
          activeOpacity={0.7}
        >
          <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={onGooglePress}
          activeOpacity={0.7}
        >
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.childrenContainer}>{children}</View>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={onBottomButtonPress}
        activeOpacity={0.8}
      >
        <Text style={styles.bottomButtonText}>{bottomButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  socialButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  childrenContainer: {
    marginBottom: 24,
  },
  bottomButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
