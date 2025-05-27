import React from 'react';
import {StyleSheet} from 'react-native';
import {ActionSheetContainer, ModalHeader} from '~/components';
import {Colors} from '~/styles';

export default function CreateCommunityAction() {
  return (
    <ActionSheetContainer
      contentContainerStyle={styles.contentContainerStyle}
      backgroundColor={Colors.Nero_3}>
      <ModalHeader title={'title'} />
    </ActionSheetContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: Colors.Nero_3,
  },
});
