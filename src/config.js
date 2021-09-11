require('dotenv').config();

export const config = {

    mongodb: {
        appId: 'scott-mueller-realm-yeisv',
        realmApiKey: process.env.REALM_API_KEY || 'kcHq4RuuRxuTMAlp9iUgN8R1QRGKysJQ7SX0ZYsOFfLDIdTN5Ju6f6QGbe1Zb4fu'
    }
};
