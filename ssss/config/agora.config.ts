// let localAppId = '';
import {isIos} from '~/utils/helper';
// try {
//   localAppId = require('./appID').default;
//   console.log('appID', localAppId);
// } catch (error) {
//   console.warn(error);
// }

const config = {
  // Get your own App ID at https://dashboard.agora.io/
  appId: 'b3e2f575c91a4da6bcefd4612aeefde3',
  // Please refer to https://docs.agora.io/en/Agora%20Platform/token
  token:
    '006b3e2f575c91a4da6bcefd4612aeefde3IAAauT9dtFrF1qy/a2tEu8gBpZ3kgczEFB/z7jVELwAhR/rHKgIAAAAAIgBADu22H+EqaAQA6AMBAAAAAgABAAAAAwABAAAABAABAAAA',
  channelId: '161',
  uid: isIos ? 0 : 1,
  logFilePath: '',
};

export default config;
