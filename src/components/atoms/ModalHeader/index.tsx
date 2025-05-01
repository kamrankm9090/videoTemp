import React from 'react';
import {Close2} from '~/assets/svgs';
import {AppText, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

type Props = {
  title?: string;
  onClose?: () => void;
};

export default function ModalHeader({title = '', onClose = () => {}}: Props) {
  return (
    <HStack justifyContent="space-between">
      <AppText fontSize={fontSize.medium} fontFamily="medium">
        {title}
      </AppText>
      <AppTouchable p={10} onPress={onClose}>
        <Close2 fill={Colors.WHITE} />
      </AppTouchable>
    </HStack>
  );
}
