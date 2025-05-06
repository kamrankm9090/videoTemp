import React from 'react';
import {StyleSheet} from 'react-native';
import {ArchiveIcon, HotSpot, LiveIcon} from '~/assets/svgs';
import {AppImage, AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';

interface TrendingItemProps {
  category: string;
  title: string;
  viewers: string;
  imageUrl: string;
}

const TrendingItem: React.FC<TrendingItemProps> = ({
  category,
  title,
  viewers,
  imageUrl,
}) => {
  return (
    <VStack style={styles.card}>
      <HStack style={styles.categoryContainer} justifyContent="space-between">
        <VStack style={styles.categoryLabel}>
          <AppText fontWeight={'500'} style={styles.categoryText}>
            {category}
          </AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppImage imageSource={{uri: imageUrl}} style={styles.image} />

      <VStack style={styles.streamerInfo}>
        <VStack style={styles.textInfo}>
          <AppText fontWeight={'500'} fontSize={16}>
            {title}
          </AppText>
          <HStack>
            <HotSpot style={{marginRight: 8}} />
            <AppText color={Colors.GARY_3}>{viewers} viewers</AppText>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth:183,
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
    backgroundColor: Colors.BLUE_BRAND, // Blue color for Trending category
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  streamerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal:8,
    backgroundColor: Colors.BLACK,
  },
  textInfo: {
    flex: 1,
    gap:4
  },
});

export default TrendingItem;
