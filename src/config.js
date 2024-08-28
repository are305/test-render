export const API_URL = process.env.REACT_APP_DJANGO_API_URL_BASE || 'http://localhost:8000'

let config = {};

if (process.env.REACT_APP_ENV === 'local') {
    config = {
        clientId: process.env.REACT_APP_FIREBASE_CLIENT_ID,
        redirectUri: "http://localhost:3000",
        scopes: [
            'user.read'
        ],
        authority: "https://login.microsoftonline.com/common"
    };
} else if (process.env.REACT_APP_ENV === 'development') {
    config = {
        clientId: process.env.REACT_APP_FIREBASE_CLIENT_ID,
        redirectUri: process.env.REACT_APP_DJANGO_API_URL_BASE,
        scopes: [
            'user.read'
        ],
        authority: "https://login.microsoftonline.com/common"
    };
} else if (process.env.REACT_APP_ENV === 'production') {
    config = {
        clientId: process.env.REACT_APP_FIREBASE_CLIENT_ID,
        redirectUri: "http://localhost:3000",
        scopes: [
            'user.read'
        ],
        authority: "https://login.microsoftonline.com/common"
      };
} else {
    throw new Error('Unknown environment. Set REACT_APP_ENV to "local", "development", or "production".');
}

export { config };