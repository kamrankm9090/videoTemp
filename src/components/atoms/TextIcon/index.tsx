import React from 'react';
import {Colors} from '~/styles';
import {HStack, AppText} from '~/components';

export default function TextIcon({
  icon,
  text,
}: {
  icon?: JSX.Element;
  text?: string;
}) {
  return (
    <HStack space={8}>
      {icon}
      <AppText color={Colors.DarkGray}>{text}</AppText>
    </HStack>
  );
}
