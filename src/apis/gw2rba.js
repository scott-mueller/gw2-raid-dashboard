import * as Realm from 'realm-web';
import { config as Config } from '../config';

const mongoSession = {
    app: new Realm.App({ id: Config.mongodb.appId }),
    user: undefined,
    db: undefined
}

const login = async () => {

    const credentials = Realm.Credentials.apiKey(Config.mongodb.realmApiKey);
    mongoSession.user = await mongoSession.app.logIn(credentials);

    const mongodb = mongoSession.app.currentUser.mongoClient('mongodb-atlas');
    mongoSession.db = mongodb.db('gw2-rba');

    console.log('Logged in!!');
  };

export const getCollectorStatsById = async (collectorId) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const collector = mongoSession.db.collection('collectors').findOne({ _id: 'ANCJsIlO' });
    return collector;
};
