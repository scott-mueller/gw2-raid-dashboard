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
  };

export const getCollectorStatsById = async (collectorId) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const collector = mongoSession.db.collection('collectors').findOne({ _id: collectorId });
    return collector;
};

export const getEncountersinIdArray = async (encounterIds) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const encounters = await mongoSession.db.collection('encounters').find({
        encounterId: {
            '$in': encounterIds
        }
    });

    return encounters;
};
