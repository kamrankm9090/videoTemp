import React from 'react';
import {View} from 'react-native';
import {AppButton, AppText, AppTouchable, Avatar, HStack} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontFamily, scale} from '~/utils/style';

type UserItemProps = {
  username: string;
  displayName?: string;
  photoUrl: string;
  onAction: () => void;
  actionTitle?: string;
  widthButton?: number;
  onPressItem?: () => void;
};

const UserItem: React.FC<UserItemProps> = ({
  username,
  displayName,
  photoUrl,
  actionTitle = 'Unblock',
  widthButton = scale(80),
  onPressItem,
  onAction,
}) => {
  const Wrapper = onPressItem ? AppTouchable : View;

  return (
    <Wrapper onPress={onPressItem}>
      <HStack alignItems="center" justifyContent="space-between">
        <Avatar
          uri={getFullImageUrl(photoUrl)}
          title={displayName || username}
        />

        <AppText numberOfLines={2} paddingHorizontal={scale(10)} flex={1}>
          {displayName || username}
        </AppText>

        <AppButton
          width={widthButton}
          height={32}
          title={actionTitle}
          borderWidth={1}
          borderColor={Colors.ERROR}
          font_family={fontFamily.medium}
          onPress={onAction}
        />
      </HStack>
    </Wrapper>
  );
};

export default UserItem;
