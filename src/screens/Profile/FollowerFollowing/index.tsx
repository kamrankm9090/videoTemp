import React from 'react';
import {
  AppContainer,
  AppHeader,
  FollowersList,
  FollowingsList,
  CustomTabView,
} from '~/components';
import {Colors} from '~/styles';

const FollowerFollowingScreen = ({route}: {route: any}) => {
  const type: 'follower' | 'following' = route?.params?.type;

  const routes = [
    {key: 'follower', title: 'Followers'},
    {key: 'following', title: 'Followings'},
  ];

  const components = {
    follower: () => <FollowersList />,
    following: () => <FollowingsList />,
  };

  return (
    <AppContainer>
      <AppHeader
        title={'Followers/Following'}
        backAction
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
      />
      <CustomTabView
        routes={routes}
        components={components}
        initialIndex={type === 'follower' ? 0 : 1}
      />
    </AppContainer>
  );
};

export default FollowerFollowingScreen;
