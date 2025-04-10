import React from 'react';
import {Apple, Facebook, Google} from '~/assets/svgs';
import {AppText, AppTouchable, Divider, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';

export default function SectionSocialMedia({
  onResponse,
}: {
  onResponse?: () => void;
}) {
  function googleOnPress() {}
  function appleOnPress() {}
  function facebookOnPress() {}

  return (
    <VStack space={24}>
      <HStack w="100%" flex={1} justifyContent="space-between">
        <Divider flex={0.25} width="auto" />
        <AppText textAlign="center" flex={1} color={Colors.MISCHKA}>
          Or continue with social account
        </AppText>
        <Divider flex={0.25} width="auto" />
      </HStack>
      <HStack justifyContent="center" space={24}>
        <AppTouchable onPress={googleOnPress}>
          <Google />
        </AppTouchable>
        <AppTouchable onPress={facebookOnPress}>
          <Facebook />
        </AppTouchable>
        {isIos && (
          <AppTouchable onPress={appleOnPress}>
            <Apple />
          </AppTouchable>
        )}
      </HStack>
    </VStack>
  );
}
