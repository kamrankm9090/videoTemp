import React from 'react';
import {ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

export default function ProfilePlaceholder() {
  return (
    <SkeletonPlaceholder
      backgroundColor={Colors.Silver_transparent_80}
      highlightColor={Colors.WHITE_TRANSPARENT_9}>
      <ScrollView flex={1}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={scale(80)}
            height={scale(20)}
            borderRadius={7}
            marginBottom={scale(15)}
          />

          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={scale(80)}
              borderRadius={1000}
            />
            <SkeletonPlaceholder.Item
              flex={1}
              paddingStart={scale(15)}
              flexDirection="column"
              justifyContent="space-between"
              height={scale(80)}>
              <SkeletonPlaceholder.Item
                width={scale(80)}
                height={scale(15)}
                borderRadius={7}
                marginBottom={scale(15)}
              />
              <SkeletonPlaceholder.Item
                width={scale(120)}
                height={scale(15)}
                borderRadius={7}
                marginBottom={scale(15)}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={scale(45)}
              height={scale(45)}
              borderRadius={7}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginTop={scale(25)}
          justifyContent="space-between">
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={scale(20)}
              borderRadius={7}
              marginBottom={scale(15)}
            />
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={scale(20)}
              borderRadius={7}
              marginBottom={scale(15)}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={scale(20)}
              borderRadius={7}
              marginBottom={scale(15)}
            />
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={scale(20)}
              borderRadius={7}
              marginBottom={scale(15)}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={scale(20)}
              borderRadius={7}
              marginBottom={scale(15)}
            />
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={scale(20)}
              borderRadius={7}
              marginBottom={scale(15)}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          width={'100%'}
          height={scale(70)}
          borderRadius={7}
        />

        <SkeletonPlaceholder.Item
          width={'100%'}
          height={scale(35)}
          borderRadius={7}
          marginTop={scale(25)}
        />

        <SkeletonPlaceholder.Item
          flexDirection="row"
          width={'100%'}
          justifyContent="space-between">
          <SkeletonPlaceholder.Item
            width={'45%'}
            height={scale(170)}
            borderRadius={7}
            marginTop={scale(25)}
          />

          <SkeletonPlaceholder.Item
            width={'45%'}
            height={scale(170)}
            borderRadius={7}
            marginTop={scale(25)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          width={'100%'}
          justifyContent="space-between">
          <SkeletonPlaceholder.Item
            width={'45%'}
            height={scale(170)}
            borderRadius={7}
            marginTop={scale(25)}
          />

          <SkeletonPlaceholder.Item
            width={'45%'}
            height={scale(170)}
            borderRadius={7}
            marginTop={scale(25)}
          />
        </SkeletonPlaceholder.Item>
      </ScrollView>
    </SkeletonPlaceholder>
  );
}
