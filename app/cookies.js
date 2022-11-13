import { setCookie, getCookie,deleteCookie,hasCookie } from "cookies-next";

export function setPhoneCookie(phone) {
  const phoneUser = getCookie("phone");
  if (!phoneUser) {
    setCookie("phone", phone);
  } else {
    let phoneUsers = getCookie("phone").split(",");
    phoneUsers.push(phone);

    let unique = phoneUsers.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    setCookie("phone", unique.toString());
  }
}

export function checkPhoneExist(phone) {
  let phoneUser = getCookie("phone") ? getCookie("phone") : "";

  return phoneUser.includes(phone);
}

export function setTokenCookie(token) {
  setCookie("token", token, {
    maxAge: 60 * 60 * 12,
  });
}

export function getTokenCookie() {
  return getCookie('token')
}

export function clearTokenCookie(){
    deleteCookie('token');
}
