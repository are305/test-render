export const config = {
    clientId: "1cd423c6-0b53-43c3-92e2-4db53b4f829e",
    redirectUri: "http://localhost:3000",
    scopes: [
        'user.read'
    ],
    authority: "https://login.microsoftonline.com/common"
};

export const API_URL = config.DJANGO_API_URL_BASE || 'http://localhost:8000'