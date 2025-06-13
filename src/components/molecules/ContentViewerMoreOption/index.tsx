import React from 'react';
import {useSnapshot} from 'valtio';
import {
  InfoCircle,
  MoreIcon,
  Send2Icon,
  VolumeHighIcon,
  VolumeSlashIcon,
} from '~/assets/svgs';
import {AppTouchable, MoreOptionItemRow} from '~/components';
import {contentStore, homePostStore} from '~/stores';
import {Colors} from '~/styles';
import {showSheet, switchActions} from '~/utils/utils';

export default function ContentViewerMoreOption() {
  const {contentData} = useSnapshot(contentStore);

  const contentViewerOptions: MoreOptionItemType[] = [
    {
      id: 0,
      customComponent: <MuteIcon />,
    },
    {
      id: 1,
      title: 'Share',
      showEndIcon: false,
      startIcon: <Send2Icon />,
      onPress: () => {
        switchActions('sharing-action', 'more-option-action', {
          payload: {item: contentData},
        });
      },
    },
    {
      id: 2,
      title: 'Report',
      showEndIcon: false,
      startIcon: <InfoCircle stroke={Colors.ERROR} />,
      color: Colors.ERROR,
      onPress: () => {
        switchActions('report-action', 'post-options-action', {
          payload: {liveId: contentData?.live?.id},
        });
      },
    },
  ];

  function onPressHandler() {
    showSheet('more-option-action', {
      payload: {
        showTitle: false,
        data: contentViewerOptions,
      },
    });
  }

  return (
    <>
      <AppTouchable onPress={onPressHandler}>
        <MoreIcon fill={Colors.WHITE} />
      </AppTouchable>
    </>
  );
}

function MuteIcon() {
  const {isMuted, setIsMuted} = useSnapshot(homePostStore);

  return (
    <MoreOptionItemRow
      title="Mute"
      startIcon={isMuted ? <VolumeSlashIcon /> : <VolumeHighIcon />}
      showEndIcon={false}
      onPress={() => setIsMuted(!isMuted)}
    />
  );
}
