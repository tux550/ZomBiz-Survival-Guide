import cookies from "./CookiesApp"

export function getToken() {
    return cookies.get('Token');
}