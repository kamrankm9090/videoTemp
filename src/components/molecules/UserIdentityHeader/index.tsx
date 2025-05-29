import {Avatar} from '@rneui/base';
import React, {memo} from 'react';
import {PencilIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';

const UserIdentityHeader = () => {
  return (
    <VStack space={scale(15)} py={scale(0)}>
      <HStack justifyContent="space-between" alignItems="center">
        <Avatar
          size={scale(50)}
          source={{
            uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          }}
          avatarStyle={{borderRadius: 1000}}
        />
        <VStack
          justifyContent="space-between"
          h={scale(50)}
          flex={1}
          ps={scale(12)}>
          <AppText fontSize={fontSize.xMedium} fontFamily={fontFamily.bold}>
            Olivia Clarke
          </AppText>
          <AppText color={Colors.GARY_3}>Digital Marketing Specialist</AppText>
        </VStack>
        <AppTouchable>
          <PencilIcon />
        </AppTouchable>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <Item title="balance" value={'$200'} />
        <Item title="Followers" value={'343'} />
        <Item title="Following" value={'200'} />
      </HStack>
    </VStack>
  );
};

const Item = ({title, value}: {title: string; value: any}) => {
  return (
    <AppTouchable>
      <VStack alignItems="center" space={scale(5)} justifyContent="center">
        <AppText fontSize={fontSize.xMedium} fontFamily={fontFamily.bold}>
          {value}
        </AppText>
        <AppText color={Colors.GARY_3}>{title}</AppText>
      </VStack>
    </AppTouchable>
  );
};

export default memo(UserIdentityHeader);
