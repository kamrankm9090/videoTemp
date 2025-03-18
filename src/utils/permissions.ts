import {PermissionsAndroid, Platform} from 'react-native';

/**
 * @name requestCameraAndAudioPermission
 * @description Function to request permission for Audio and Camera
 */
export default async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export type mediaType =
  | 'android.permission.RECORD_AUDIO'
  | 'android.permission.CAMERA';
export interface AskMediaAccessReturn {
  result: boolean;
  mediaType: mediaType;
}

/**
 * request media permission Android ONLY
 * If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect.
 * If access has already been requested and denied, it must be changed through the preference pane;
 * this fun will not call and the promise will resolve with the existing access status.
 * @param mediaTypes
 * @returns AskMediaAccessReturn[]
 */
export const askMediaAccess = async (
  mediaTypes: mediaType[],
): Promise<AskMediaAccessReturn[]> => {
  let results: AskMediaAccessReturn[] = [];
  if (Platform.OS === 'android') {
    for (const mediaType of mediaTypes) {
      let result: boolean = false;
      await PermissionsAndroid.request(mediaType)
        .then(res => {
          result = res === 'granted';
        })
        .catch(error => {
          result = error;
        })
        .finally(() => {
          results.push({
            mediaType,
            result,
          });
        });
    }
  }
  return results;
};
