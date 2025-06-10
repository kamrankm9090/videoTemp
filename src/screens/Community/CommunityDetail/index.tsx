import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SettingIcon} from '~/assets/svgs';
import {
  AppContainer,
  AppFlatList,
  AppHeader,
  CommunityDetailBottomInputBar,
  CommunityDetailItem,
} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';

const CommunityDetail = () => {
  const route = useRoute();
  const item = route?.params;
  const renderItem = () => {
    return <CommunityDetailItem />;
  };
  return (
    <AppContainer>
      <AppHeader
        backAction
        title={item?.title}
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
        rightHeader={
          <>
            <SettingIcon
              onPress={() =>
                navigate('CommunityStack', {
                  screen: 'CommunityInfo',
                  params: {item},
                })
              }
            />
          </>
        }
        subTitle={`${item?.userCount} member • 1,230 online`}
        subTitleColor={Colors.DarkGray}
      />
      <AppFlatList
        data={[1, 2, 3]}
        keyExtractor={(item, index) => `message-${index}`}
        contentContainerStyle={{padding: 16, paddingBottom: 80}}
        renderItem={renderItem}
      />
      <CommunityDetailBottomInputBar />
    </AppContainer>
  );
};

export default CommunityDetail;

const styles = StyleSheet.create({});
