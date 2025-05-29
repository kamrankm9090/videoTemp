import React from 'react';
import {StyleSheet} from 'react-native';
import {MoreIcon} from '~/assets/svgs';
import {
  AppContainer,
  AppHeader,
  AppScrollView,
  AppTouchable,
  GroupInfoActionButtons,
  GroupInfoDescription,
  GroupInfoMedia,
  GroupInfoMemberList,
  GroupInfoSection,
} from '~/components';
import {Colors} from '~/styles';
import {showSheet} from '~/utils/utils';

const CommunityInfoScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title={'Community info'}
        backAction
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
        rightHeader={
          <AppTouchable onPress={() => showSheet('more-option-action')}>
            <MoreIcon />
          </AppTouchable>
        }
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
