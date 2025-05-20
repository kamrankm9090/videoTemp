import React from 'react';
import {StyleSheet} from 'react-native';
import {
  AppContainer,
  AppHeader,
  AppScrollView,
  GroupInfoActionButtons,
  GroupInfoDescription,
  GroupInfoMedia,
  GroupInfoMemberList,
  GroupInfoSection,
} from '~/components';
import {Colors} from '~/styles';

const CommunityInfoScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title={'Community info'}
        backAction
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
      />
      <AppScrollView style={{padding: 20}}>
        <GroupInfoSection />
        <GroupInfoActionButtons />
        <GroupInfoDescription />
        <GroupInfoMemberList />
        <GroupInfoMedia />
      </AppScrollView>
    </AppContainer>
  );
};

export default CommunityInfoScreen;

const styles = StyleSheet.create({});
