require('dotenv').config();

export const config = {

    mongodb: {
        appId: 'scott-mueller-realm-yeisv',
        realmApiKey: process.env.REALM_API_KEY
    }
};
