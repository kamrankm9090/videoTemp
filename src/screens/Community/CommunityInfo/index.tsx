import { useRoute } from '@react-navigation/native';
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

  const route: any = useRoute()
  const item = route?.params?.item

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
        <GroupInfoSection item={item}/>
        <GroupInfoActionButtons item={item}/>
        <GroupInfoDescription item={item}/>
        <GroupInfoMemberList />
        <GroupInfoMedia />
      </AppScrollView>
    </AppContainer>
  );
};

export default CommunityInfoScreen;

const styles = StyleSheet.create({});
