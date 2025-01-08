import React from 'react';
import {StyleSheet} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {HomeFill, HomeOutline, Live, LiveOutline} from '~/assets/svgs';
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
    <Box
      bottom={
        initialWindowMetrics?.insets?.bottom
          ? initialWindowMetrics?.insets?.bottom - scale(7)
          : scale(10)
      }
      style={styles.main}>
      <HStack
        h={62}
        shadow={3}
        rounded={38}
        bg={Colors.WHITE}
        style={styles.container}>
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
                <TabBarButton key={route.name} onPress={onPress}>
                  {isFocused ? <HomeFill /> : <HomeOutline />}
                </TabBarButton>
              );
            case 'LiveTab':
              return (
                <TabBarButton key={route.name} onPress={onPress}>
                  {isFocused ? (
                    <Live height={24} width={24} />
                  ) : (
                    <LiveOutline height={24} width={24} />
                  )}
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

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    zIndex: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.WHITE, // White background, can make translucent if needed
    opacity: 0.9, // Optional: Transparency for a floating effect
    paddingHorizontal: scale(15),
  },
});
