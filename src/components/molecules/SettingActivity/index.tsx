import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {AppFlatList, SettingActivityItem} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import {hideSheet, logout, showSheet} from '~/utils/utils';

type Item = {
  title: string;
  color?: string;
  onPress: () => void;
};

const accountSettingOptions: MoreOptionItemType[] = [
  {
    id: 0,
    title: 'Manage Blocked Users',
    onPress: () => {
      hideSheet('more-option-action');
      navigate('ProfileStack', {
        screen: 'BlockedUsers',
      });
    },
  },
  {
    id: 1,
    title: 'Password setting',
    onPress: () => {
      hideSheet('more-option-action');
      navigate('ProfileStack', {
        screen: 'PasswordSetting',
      });
    },
  },
  {
    id: 2,
    title: 'Delete Account',
    color: Colors.ERROR,
    onPress: () => {
      hideSheet('more-option-action');
      navigate('ProfileStack', {
        screen: 'DeleteAccount',
      });
    },
  },
];

const SettingActivity = () => {
  const data: Item[] = [
    {
      title: 'Personal Information',
      onPress: () =>
        navigate('ProfileStack', {
          screen: 'EditProfile',
        }),
    },
    {
      title: 'Analytics',
      onPress: () =>
        navigate('ProfileStack', {
          screen: 'Analytics',
        }),
    },
    {
      title: 'Your Resume ',
      onPress: () =>
        navigate('ProfileStack', {
          screen: 'Resume',
        }),
    },
    {
      title: 'Wallet',
      onPress: () =>
        navigate('ProfileStack', {
          screen: 'Wallet',
        }),
    },
    {
      title: 'Saved',
      onPress: () =>
        navigate('ProfileStack', {
          screen: 'Saved',
        }),
    },
    {
      title: 'Support',
      onPress: () =>
        navigate('ProfileStack', {
          screen: 'Support',
        }),
    },
    {
      title: 'Account Setting',
      onPress: () =>
        showSheet('more-option-action', {
          payload: {
            title: 'More Option',
            data: accountSettingOptions,
          },
        }),
    },
    {title: 'Logout', color: Colors.ERROR, onPress: logoutHandler},
  ];

  function logoutHandler() {
    showSheet('confirmation-action', {
      payload: {
        title: 'Log out',
        description: 'Are you sure you want to log out?',
        positiveText: 'Log out',
        positiveBackgroundColor: 'red',
        positiveColor: '#fff',
        onClose: () => hideSheet('confirmation-action'),
        onConfirm: () => {
          logout();
          hideSheet('confirmation-action');
        },
      },
    });
  }

  const renderItem = useCallback(
    ({item}) => <SettingActivityItem item={item} />,
    [],
  );

  return (
    <AppFlatList
      bounces={false}
      data={data}
      contentContainerStyle={styles.main}
      renderItem={renderItem}
    />
  );
};

export default memo(SettingActivity);

const styles = StyleSheet.create({
  main: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(15),
    borderRadius: scale(15),
    backgroundColor: Colors.Nero_3,
    marginHorizontal: scale(12),
    marginBottom: scale(80),
    marginTop: scale(10),
  },
});
