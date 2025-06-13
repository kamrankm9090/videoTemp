import React from 'react';
import {ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function CommunityPlaceholder() {
  return (
    <SkeletonPlaceholder
      backgroundColor={Colors.Silver_transparent_80}
      highlightColor={Colors.WHITE_TRANSPARENT_9}>
      <ScrollView contentContainerStyle={{padding: scale(16)}}>
        {[...Array(3)].map((_, i) => (
          <SkeletonPlaceholder.Item
            key={i}
            flexDirection="column"
            marginBottom={scale(16)}
            padding={scale(12)}
            borderRadius={8}
            width="100%">
            {/* Top Row: Avatar + Name + Badge */}
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              {/* Avatar */}
              <SkeletonPlaceholder.Item
                width={scale(35)}
                height={scale(35)}
                borderRadius={100}
                marginRight={scale(10)}
              />
              {/* Name */}
              <SkeletonPlaceholder.Item
                width={scale(80)}
                height={scale(14)}
                borderRadius={4}
              />
              {/* Owner badge */}
              <SkeletonPlaceholder.Item
                marginLeft={scale(10)}
                width={scale(45)}
                height={scale(20)}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>

            {/* Description */}
            <SkeletonPlaceholder.Item
              marginTop={scale(10)}
              width={scale(180)}
              height={scale(12)}
              borderRadius={4}
            />

            {/* Bottom Row: member icon + lock + button */}
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginTop={scale(16)}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                {/* Member icon and count */}
                <SkeletonPlaceholder.Item
                  width={scale(18)}
                  height={scale(14)}
                  borderRadius={4}
                  marginRight={scale(6)}
                />
                <SkeletonPlaceholder.Item
                  width={scale(10)}
                  height={scale(12)}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>

              {/* Lock icon and "private" */}
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item
                  width={scale(14)}
                  height={scale(14)}
                  borderRadius={4}
                  marginRight={scale(6)}
                />
                <SkeletonPlaceholder.Item
                  width={scale(40)}
                  height={scale(12)}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            {/* Button */}
            <SkeletonPlaceholder.Item
              marginTop={scale(12)}
              width="100%"
              height={scale(35)}
              borderRadius={6}
            />
          </SkeletonPlaceholder.Item>
        ))}
      </ScrollView>
    </SkeletonPlaceholder>
  );
}
