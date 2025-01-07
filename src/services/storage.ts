import {MMKV} from 'react-native-mmkv';
import {storageKeysToKeep} from '~/constants/constants';
import {reportError} from '~/utils/helper';

export const appStorage = new MMKV({
  id: 'app-storage',
  encryptionKey: 'hunter2',
});

export function saveData(key: StorageKeys, value: any) {
  try {
    if (value) {
      appStorage.set(key, value);
    }
  } catch (error) {
    reportError(error, 'save string');
  }
}

export function saveObject(key: StorageKeys, value: any) {
  try {
    if (value) {
      appStorage.set(key, JSON.stringify(value));
    }
  } catch (error) {
    reportError(error, 'save object');
  }
}

export function getObject(key: StorageKeys) {
  const res = appStorage.getString(key);
  return res ? JSON?.parse(res) : undefined;
}

export function getString(key: StorageKeys) {
  return appStorage.getString(key);
}

export function getBoolean(key: StorageKeys) {
  return appStorage.getBoolean(key);
}

export function getNumber(key: StorageKeys) {
  return appStorage.getNumber(key);
}

export function removeData(key: StorageKeys) {
  appStorage.delete(key);
}

export function removeAppStorageData() {
  const keys = appStorage.getAllKeys();
  keys
    .filter((key: string) => !storageKeysToKeep.includes(key))
    ?.map((keyItem: string) => {
      appStorage.delete(keyItem);
    });
}

export const zustandStorage: ZustandStorageType = {
  setItem: (name, value) => {
    return appStorage.set(name, value);
  },
  getItem: name => {
    const value = appStorage.getString(name);
    return value || null;
  },
  removeItem: name => {
    return appStorage.delete(name);
  },
};
