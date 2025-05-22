import React from 'react';
import {StyleSheet} from 'react-native';
import {SettingIcon} from '~/assets/svgs';
import {AppContainer, AppFlatList, AppHeader} from '~/components';
import BottomInputBar from '~/components/molecules/CommunityDetailBottomInputBar';
import CommunityDetailItem from '~/components/molecules/CommunityDetailItem';
import { navigate } from '~/navigation/methods';
import {Colors} from '~/styles';

const CommunityDetail = () => {
  const myUserId = 1;
  const renderItem = () => {
    return <CommunityDetailItem />;
  };
  return (
    <AppContainer>
      <AppHeader
        backAction
        title="Beauty Documentary"
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
        rightHeader={
          <>
            <SettingIcon onPress={() => navigate("CommunityStack", {screen:"CommunityInfo"})} />
          </>
        }
        subTitle="5,780 member • 1,230 online"
        subTitleColor={Colors.DarkGray}
      />
      <AppFlatList
        data={[1, 2, 3]}
        keyExtractor={(item, index) => `message-${index}`}
        contentContainerStyle={{padding: 16, paddingBottom: 80}}
        renderItem={renderItem}
      />
      <BottomInputBar />
    </AppContainer>
  );
};

export default CommunityDetail;

const styles = StyleSheet.create({});
