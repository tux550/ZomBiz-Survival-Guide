import axios from 'axios';
import cookies from "../libs/CookiesApp";
import config from "../config";


const axiosAuth = axios.create(
    {baseURL:config.api.method+"://"+config.api.host+":"+config.api.port}
);

export function SignInPost(email, password) {
    axiosAuth.post('/api/auth/login',{"email": email, "password": password}).then((response) => {
        cookies.set('Token', response.data.token);
        window.location.replace('/?success=True');
    }, (error) => {
        cookies.set('Token', '');
        alert('Can not sign in');
        window.location.replace('/?success=False');
    });
}

export function SignUpPost(name, email, password) {
    axiosAuth
      .post('/api/auth/register', { name, email, password })
      .then((response) => {
        cookies.set('Token', response.data.token);
        window.location.replace('/?success=True');
      })
      .catch((error) => {
        cookies.set('Token', '');
        alert('Can not sign up');
        window.location.replace('/?success=False');
      });
  }