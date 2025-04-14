import {proxy} from 'valtio';

const authenticationStore = proxy<authenticationStoreType>({
  email: '',
  verificationCode: '',
  isForResetPassword: false,
  setEmail: (email: string) => {
    authenticationStore.email = email;
  },
  setIsForResetPassword: (isForResetPassword: boolean) => {
    authenticationStore.isForResetPassword = isForResetPassword;
  },
  setVerificationCode: (verificationCode: string) => {
    authenticationStore.verificationCode = verificationCode;
  },
});

export default authenticationStore;
