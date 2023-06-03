import axios from 'axios';
import cookies from "../libs/CookiesApp";
import {getToken} from "../libs/AuthToken";
import config from "../config";


const axiosAPI = axios.create(
    {baseURL:config.api.method+"://"+config.api.host+":"+config.api.port}
);

export function SignInPost(email, password) {
    axiosAPI.post(
        '/api/auth/login',
        {
            "email": email,
            "password": password
        }
    ).then((response) => {
        cookies.set('Token', response.data.token);
        window.location.replace('/?success=True');
    }, (error) => {
        cookies.set('Token', '');
        alert('Can not sign in');
        window.location.replace('/?success=False');
    });
}

export function GetSubscriptions() {
    return axiosAPI.get(
        '/api/resources/subscriptions',
        {}
    ).then(res => res.data);
}

export function GetSubscriptionCheckoutSession(subscription_id) {
    axiosAPI.post(
        '/api/payment/create-checkout-session',
        {
            "token": getToken(),
            "subscription_id": subscription_id
        }
    ).then((response) => {
        let stripe_url = response.data.sessionUrl;
        window.location.replace(stripe_url);
    }, (error) => {
        alert('Can not create stripe session');
    });
  }