import { AuthDetail } from '@/types/auth';

const _prefix = '_techplatform_';

enum StorageKey {
  ACCESS_TOKEN = `${_prefix}_token`,
}

class StorageHelper {
  // token
  getAuthToken(): AuthDetail | null {
    return this.getStorage(StorageKey.ACCESS_TOKEN, null);
  }

  setAuthToken(token: AuthDetail): void {
    this.setStorage<AuthDetail>(StorageKey.ACCESS_TOKEN, token);
  }

  deleteAuthToken() {
    this.removeStorage(StorageKey.ACCESS_TOKEN);
  }

  // set storage

  setStorage<T>(key: StorageKey, value: T): void {
    if (!window.localStorage) {
      return;
    }
    try {
      const lsValue = JSON.stringify(value);
      window.localStorage.setItem(key, lsValue);
    } catch (error) {
      console.error(`${key} LOCAL STORAGE SAVE ERROR`, error);
    }
  }

  getStorage<T = any>(key: StorageKey, defaultValue: T): T {
    if (typeof window !== 'undefined') {
      if (!window.localStorage) {
        return defaultValue;
      }
      const lsValue: string | null = window.localStorage.getItem(key);
      if (!lsValue) {
        return defaultValue;
      }
      try {
        const store: T = JSON.parse(lsValue) as T;
        if (!store) {
          return defaultValue;
        }
        return store;
      } catch (error) {
        console.error(`${key} LOCAL STORAGE PARSE ERROR`, error);
      }
    }

    return defaultValue;
  }

  removeStorage(key: StorageKey): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
}

const storage = new StorageHelper();

export default storage;
