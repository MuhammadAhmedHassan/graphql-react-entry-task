type Key = 'user-token';

export class AppLocalStorage {
  static setItem(key: Key, value: string) {
    localStorage.setItem(key, value);
  }

  static getItem(key: Key) {
    return localStorage.getItem(key);
  }

  static removeItem(key: Key) {
    return localStorage.removeItem(key);
  }
}
