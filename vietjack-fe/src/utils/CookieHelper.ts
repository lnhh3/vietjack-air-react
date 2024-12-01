import { isSSR } from "@/utils/index";

const _prefix = "_vietjet_";

export enum CookieKeys {
  ACCESS_TOKEN = `${_prefix}_token`,
}

class CookieHelper {
  getCookie(name: string): string | null {
    if (isSSR()) return null;
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
  setCookie(name: string, value: string, expires?: Date): void {
    if (isSSR()) return;
    this.deleteCookie(name);
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires) {
      cookieString += `;expires=${expires.toUTCString()}`;
    }
    document.cookie = cookieString;
  }
  // Method to get a cookie value by name

  // Method to delete a cookie by name
  deleteCookie(name: string): void {
    if (isSSR()) return;
    document.cookie = `${encodeURIComponent(name)}=;expires=0`;
  }
}

export default new CookieHelper();
