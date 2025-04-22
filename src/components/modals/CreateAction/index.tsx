import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ChevronRight, LiveTV, VideoCall} from '~/assets/svgs';
import AppText from '~/components/atoms/AppText';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {height} from '~/utils/style';
import ActionSheetContainer from '../ActionSheetContainer';

const CreateAction = () => {
  const handleNavigate = useCallback((screen: string) => {
    navigate('Create', {screen});
  }, []);

  return (
    <ActionSheetContainer minHeight={height * 0.2}>
      <AppText fontSize={16} fontWeight={'600'} marginBottom={16}>
        Select A Creating Option
      </AppText>
      {[
        {
          title: 'Monetized Live',
          subtitle: 'Create live content to earn money',
          icon: <LiveTV />,
          screen: 'MonetizedLive',
        },
        {
          title: 'Collaborative Live',
          subtitle: 'Make live requests and inform',
          icon: <VideoCall />,
          screen: 'CollaborativeLive',
        },
      ].map(({title, subtitle, icon, screen}) => (
        <TouchableOpacity
          key={screen}
          style={styles.optionBox}
          onPress={() => handleNavigate(screen)}
          activeOpacity={0.7}>
          <View style={styles.iconText}>
            {icon}
            <View style={styles.textContainer}>
              <AppText fontSize={15} fontWeight={'600'}>
                {title}
              </AppText>
              <AppText
                fontSize={13}
                color={Colors.WHITE_TRANSPARENT_3}
                marginTop={2}>
                {subtitle}
              </AppText>
            </View>
          </View>
          <ChevronRight />
        </TouchableOpacity>
      ))}
    </ActionSheetContainer>
  );
};

export default memo(CreateAction);

const styles = StyleSheet.create({
  optionBox: {
    backgroundColor: Colors.WHITE_TRANSPARENT_1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },

  optionSubtitle: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
});
