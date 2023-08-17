type Cookie = {
  name: string;
  value: string;
};
export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number
) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const getCookie = (name: string): Cookie | null => {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");

    if (cookieName === name) {
      return { name: cookieName, value: decodeURIComponent(cookieValue) };
    }
  }

  return null;
};
