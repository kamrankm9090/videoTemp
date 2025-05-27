import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {ScrollView, Share, Linking} from 'react-native';
import {
  CopyLinkIcon,
  EmailIcon,
  Message1Icon,
  More1Icon,
} from '~/assets/svgs';
import {
  AppContainer,
  AppInput,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';

export default function InviteLink() {
  const inviteLink = 'Vdfbfdbfngfngfbt34y5ygherth655utrbtbhtbtbhttrh6';

  const handleCopy = () => {
    Clipboard.setString(inviteLink);
    // TODO: Optionally show toast or feedback
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me using this link: ${inviteLink}`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleEmail = () => {
    Linking.openURL(
      `mailto:?subject=Join me on the app&body=Use this invite link: ${inviteLink}`
    );
  };

  const handleMessage = () => {
    Linking.openURL(`sms:&body=Hey! Use this invite link to join: ${inviteLink}`);
  };

  const handleMore = () => {
    handleShare();
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <VStack space={32}>
          <AppText fontSize={18} fontFamily="bold" textAlign="center">
            Invite links
          </AppText>

          <AppText textAlign="center" color={Colors.Grey}>
            Introduce your friends to us and receive 3 free KLP for every
            referral
          </AppText>

          <HStack space={12} justifyContent="space-between">
            <ShareItem icon={<EmailIcon />} label="Email" onPress={handleEmail} />
            <ShareItem icon={<Message1Icon />} label="Message" onPress={handleMessage} />
            <ShareItem icon={<CopyLinkIcon />} label="Copy link" onPress={handleCopy} />
            <ShareItem icon={<More1Icon />} label="More" onPress={handleMore} />
          </HStack>

          <VStack space={8} p={16} bg={Colors.NERO} borderRadius={8}>
            <AppText color={Colors.GARY_3} fontSize={13}>
              Invite link
            </AppText>
            <AppInput value={inviteLink} editable={false} multiline />
          </VStack>

          <HStack space={12}>
            <AppTouchable
              flex={1}
              borderWidth={1}
              borderColor={Colors.WHITE}
              p={14}
              borderRadius={8}
              alignItems="center"
              onPress={handleShare}>
              <AppText fontFamily="bold" color={Colors.WHITE}>
                Share
              </AppText>
            </AppTouchable>

            <AppTouchable
              onPress={handleCopy}
              flex={1}
              p={14}
              borderRadius={8}
              alignItems="center"
              bg={Colors.PRIMARY}>
              <AppText fontFamily="bold" color={Colors.WHITE}>
                Copy
              </AppText>
            </AppTouchable>
          </HStack>
        </VStack>
      </ScrollView>
    </AppContainer>
  );
}
function ShareItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <AppTouchable onPress={onPress}>
      <VStack alignItems="center" space={8}>
        <VStack bg={Colors.Nero_3} p={12} borderRadius={12}>
          {icon}
        </VStack>
        <AppText fontSize={13}>{label}</AppText>
      </VStack>
    </AppTouchable>
  );
}
