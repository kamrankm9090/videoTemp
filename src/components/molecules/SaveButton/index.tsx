import React, {useEffect, useState} from 'react';
import {
  useLive_AddToBookmarkMutation,
  useLive_RemoveFromBookmarkMutation,
} from '~/graphql/generated';
import {showErrorMessage} from '~/utils/utils';
import {AppTouchable} from '~/components';
import {Save, Saved} from '~/assets/svgs';

export default function SaveButton({
  isSaved,
  liveId,
}: {
  isSaved?: boolean;
  liveId: number;
}) {
  const [saved, setSaved] = useState<boolean>(false);

  const {mutate: mutateAddToBookmark} = useLive_AddToBookmarkMutation();
  const {mutate: mutateRemoveFromBookmark} =
    useLive_RemoveFromBookmarkMutation();

  useEffect(() => {
    setSaved(isSaved ?? false);
  }, [isSaved]);

  async function saveOnPress() {
    if (saved) {
      setSaved(false);
      mutateRemoveFromBookmark(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_removeFromBookmark?.code !== 1) {
              showErrorMessage(response?.live_removeFromBookmark?.description);
            }
          },
        },
      );
    } else {
      setSaved(true);
      mutateAddToBookmark(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_addToBookmark?.code !== 1) {
              showErrorMessage(response?.live_addToBookmark?.description);
            }
          },
        },
      );
    }
  }

  return (
    <AppTouchable
      p={4}
      onPress={saveOnPress}
      position="absolute"
      top={12}
      right={12}>
      {saved ? <Saved /> : <Save />}
    </AppTouchable>
  );
}
