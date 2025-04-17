import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '~/components/atoms/AppText';
import { Colors } from '~/styles';

export default function InviteFriendsCard({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.card}>
      <View>
        <AppText fontWeight={"bold"} marginBottom={8}>Invite friends to get KLP</AppText>
        <AppText color={Colors.WHITE_TRANSPARENT_4} style={styles.subtitle}>Get 10 KLP for each other</AppText>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <AppText fontWeight={"600"}>Invite friend</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },

  subtitle: {
    color: '#999',
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#F97316',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
 
});
