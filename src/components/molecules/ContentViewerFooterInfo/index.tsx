import React from 'react';
import {CalenderIcon} from '~/assets/svgs';
import {AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';

interface ContentViewerFooterInfoProps {
  datetime: string;   // Full ISO or datetime string e.g. '2025-12-10T12:20:23'
  price: string;
  duration: string;
}

const ContentViewerFooterInfo: React.FC<ContentViewerFooterInfoProps> = ({
  datetime,
  price,
  duration,
}) => {
  // Extract date and time
  const [datePart, timePart] = datetime.split('T');
  const date = datePart?.replace(/-/g, '/'); // e.g., 2025/12/10
  const time = timePart?.slice(0, 8);        // e.g., 12:20:23

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      px={12}
      py={8}
      w="100%"
      position="absolute"
      bottom={0}
      left={0}
      right={0}>
      
      <HStack
        alignItems="center"
        bg={Colors.BLACK_TRANSPARENT_8}
        px={12}
        py={6}
        borderRadius={10}>
        <CalenderIcon style={{marginRight: 8}} />
        <AppText color={Colors.WHITE}>
          {date} • {time}
        </AppText>
      </HStack>

      <VStack
        bg={Colors.BLACK_TRANSPARENT_8}
        px={12}
        py={6}
        borderRadius={10}
        alignItems="flex-end">
        <AppText color={Colors.WHITE} fontWeight="700">
          {price}
        </AppText>
        <AppText color={Colors.GARY_3} fontSize={13}>
          {duration}
        </AppText>
      </VStack>
    </HStack>
  );
};

export default ContentViewerFooterInfo;
