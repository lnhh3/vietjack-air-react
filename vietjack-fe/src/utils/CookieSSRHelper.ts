// import "server-only";
//
// import { cookies } from "next/headers";
//
// class CookieSSRHelper {
//   getCookieSSR(name: string) {
//     const cooke = cookies();
//     return cooke.get(name)?.value || null;
//   }
//
//   setCookieSSR(name: string, value: string, expires?: Date) {
//     const cooke = cookies();
//     cooke.set({
//       name: name,
//       value: value,
//       expires: expires,
//     });
//   }
//
//   // Method to delete a cookie by name
//   deleteCookie(name: string): void {
//     const cooke = cookies();
//     cooke.delete({ name });
//   }
// }
//
// export default new CookieSSRHelper();
