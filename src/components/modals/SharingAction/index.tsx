import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {SheetProps} from 'react-native-actions-sheet';
import {Copy, Share} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppButton,
  AppFlatList,
  AppImage,
  AppText,
  HStack,
  SearchInput,
  Spacer,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {fontSize, height} from '~/utils/style';

const data = [
  {
    id: 0,
    fullName: 'Liam Clarke',
    imageURL: 'https://picsum.photos/200/300',
  },
  {
    id: 1,
    fullName: 'Liam Clarke',
    imageURL: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    fullName: 'Liam Clarke',
    imageURL: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    fullName: 'Liam Clarke',
    imageURL: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    fullName: 'Liam Clarke',
    imageURL: 'https://picsum.photos/200/300',
  },
];

export default function SharingAction(props: SheetProps<'sharing-action'>) {
  function onSubmitSearch() {}

  function renderItem({item}: any) {
    return <SharingRow {...{item}} />;
  }

  const itemSeparatorComponent = useCallback(() => <Spacer spaceY={20} />, []);

  return (
    <ActionSheetContainer minHeight={height * 0.75}>
      <VStack space={16} flex={1}>
        <AppText color={Colors.WhiteSmoke} fontFamily="bold">
          Select A Person
        </AppText>
        <HStack
          mt={8}
          py={12}
          px={16}
          space={16}
          rounded={8}
          borderWidth={1}
          borderColor={Colors.WHITE}>
          <Share />
          <AppText color={Colors.Silver} fontFamily="medium" flex={1}>
            Share content link
          </AppText>
          <Copy />
        </HStack>
        <SearchInput onChange={onSubmitSearch} />
        <AppFlatList
          data={data}
          renderItem={renderItem}
          itemSeparatorComponent={itemSeparatorComponent}
        />
      </VStack>
    </ActionSheetContainer>
  );
}

function SharingRow({item}: {item: any}) {
  function sendOnPress() {}

  return (
    <HStack space={16}>
      <AppImage
        resizeMode="stretch"
        style={styles.avatar}
        imageSource={item?.imageURL}
      />
      <AppText flex={1}>{item?.fullName}</AppText>
      <AppButton
        borderColor={Colors.Grey}
        borderWidth={1}
        borderRadius={8}
        fontSize={fontSize.small}
        outline
        width={85}
        height={29}
        title="Send Now"
        color={Colors.WHITE}
        onPress={sendOnPress}
        backgroundColor={Colors.NIGHT_RIDER}
      />
    </HStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 42,
  },
});
