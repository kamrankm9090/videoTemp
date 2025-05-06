import React from 'react';
import {StyleSheet} from 'react-native';
import {ArchiveIcon, LiveIcon, MoreIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import { showSheet } from '~/utils/utils';

interface StreamItemProps {
  category: string;
  title: string;
  description: string;
  viewers: string;
  imageUrl: string;
  profileImageUrl: string;
}

const StreamItem: React.FC<StreamItemProps> = ({
  category,
  title,
  description,
  viewers,
  imageUrl,
  profileImageUrl,
}) => {
  return (
    <VStack style={styles.card}>
      <HStack style={styles.categoryContainer} justifyContent="space-between">
        <VStack style={styles.categoryLabel}>
          <AppText fontWeight={'500'}>{category}</AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppImage imageSource={{uri: imageUrl}} style={styles.image} />

      <VStack style={styles.streamerInfo}>
        <AppImage
          imageSource={{uri: profileImageUrl}}
          style={styles.profileImage}
        />
        <VStack style={styles.textInfo}>
          <AppText fontWeight={'500'} fontSize={16}>
            {title}
          </AppText>
          <AppText fontWeight={'400'} fontSize={13}>
            {description}
          </AppText>
          <HStack>
            <LiveIcon
              color={Colors.ERROR_BACKGROUND}
              style={{marginRight: 8}}
            />
            <AppText color={Colors.GARY_3}>{viewers} viewers</AppText>
          </HStack>
        </VStack>

        <AppTouchable onPress={() => showSheet('offer-select-option-action')}>
          <MoreIcon />
        </AppTouchable>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.Grey,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  categoryContainer: {
    width: '100%',
    position: 'absolute',
    top: 10,
    paddingHorizontal: 16,
  },
  categoryLabel: {
    backgroundColor: Colors.ERROR,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  streamerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.BLACK,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textInfo: {
    flex: 1,
  },
});

export default StreamItem;
