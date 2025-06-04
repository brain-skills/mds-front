import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        © 2024{' '}
        <Text style={styles.highlightedText}>Mega Digital Studio</Text>
        , Все права защищены.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 23, 
    borderTopWidth: 1,
    borderTopColor: '#999',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerText: {
    color: '#555',
    fontSize: 14, 
  },
  highlightedText: {
    color: '#008B3E',
    textDecorationLine: 'underline',
  },
});
