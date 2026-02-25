const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const tokenService = {
  getAccessToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN);
  },
  getRefreshToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN);
  },
  setToken: (access_token: string, refresh_token: string) => {
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);

    document.cookie = `access_token=${access_token}; path=/`;
  },
  clearToken: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  },
};
