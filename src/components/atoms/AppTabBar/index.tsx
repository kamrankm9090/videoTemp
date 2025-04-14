import React from 'react';
import {StyleSheet} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {
  Community,
  CommunityOutline,
  HomeFill,
  HomeOutline,
  Offers,
  OffersOutline,
  Plus,
  Profile,
  ProfileOutline,
} from '~/assets/svgs';
import {Box, HStack, TabBarButton} from '~/components';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

export default function AppTabBar({
  state,
  navigation,
}: {
  state?: any;
  navigation?: any;
}) {
  return (
    <Box bg={Colors.NERO}>
      <HStack
        h={61}
        bottom={
          initialWindowMetrics?.insets?.bottom
            ? initialWindowMetrics?.insets?.bottom - scale(7)
            : scale(10)
        }
        bg={Colors.NERO}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true});
            }
          };

          // Return specific icons for each tab
          switch (route.name) {
            case 'HomeTab':
              return (
                <TabBarButton text="Home" key={route.name} onPress={onPress}>
                  {isFocused ? <HomeFill /> : <HomeOutline />}
                </TabBarButton>
              );
            case 'OffersTab':
              return (
                <TabBarButton text="Offers" key={route.name} onPress={onPress}>
                  {isFocused ? <Offers /> : <OffersOutline />}
                </TabBarButton>
              );
            case 'CreateTab':
              return (
                <TabBarButton key={route.name} onPress={onPress}>
                  {isFocused ? <Plus /> : <Plus />}
                </TabBarButton>
              );
            case 'CommunityTab':
              return (
                <TabBarButton
                  text="Community"
                  key={route.name}
                  onPress={onPress}>
                  {isFocused ? <Community /> : <CommunityOutline />}
                </TabBarButton>
              );
            case 'ProfileTab':
              return (
                <TabBarButton text="Profile" key={route.name} onPress={onPress}>
                  {isFocused ? <Profile /> : <ProfileOutline />}
                </TabBarButton>
              );
            default:
              return null;
          }
        })}
      </HStack>
    </Box>
  );
}
