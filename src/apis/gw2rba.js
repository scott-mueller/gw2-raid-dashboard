import * as Realm from 'realm-web';
import bcrypt from 'bcryptjs';
import { config as Config } from '../config';
import { customAlphabet } from 'nanoid';

const generateId = customAlphabet(Config.idGeneration.alphabet, 20);

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

export const getEncountersByPlayerAndCollector = async ({accountName, collectorId}) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    let encounters = await mongoSession.db.collection('encounters').find({
        collectors: collectorId
    });

    // Maybe its using the old collectorId field
    if (encounters.length === 0) {
        encounters = await mongoSession.db.collection('encounters').find({
            collectorId
        });
    }

    return encounters.filter((encounter) => encounter.accountNames.includes(accountName));
};

export const postUser = async ({username, password, accountName, apiKey}) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const users = mongoSession.db.collection('users');

    const existingUser = await users.findOne({username});

    if (existingUser) {
        return {
            success: false,
            data: existingUser._id,
            message: 'An account with this username already exists'
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = generateId();
    const newUser = await users.insertOne({
        username,
        password: hashedPassword,
        accounts: [
            { 
                accountName,
                apiKey
            }
        ],
        sessionTokens: [
            token
        ]
    });

    return {
        success: true,
        data: newUser?.insertedId,
        message: 'Account created successfully'
    }
};

export const getUserById = async (userId) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const user = await mongoSession.db.collection('users').findOne({_id: userId});
    return user;
};

export const getUserByUsernameAndPassword = async ({ username, password }) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }
    
    const user = await mongoSession.db.collection('users').findOne({ username });

    if (!user) {
        return {
            success: false,
            failField: 'username',
            message: 'User with this name does not exist'
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return {
            success: false,
            failField: 'password',
            message: 'Invalid Password'
        }
    }

    // Create a session token
    const sessionToken = generateId();
    await mongoSession.db.collection('users').updateOne({_id: user._id}, { $set: { sessionTokens: [ ...user.sessionTokens, sessionToken ] }});

    return {
        success: true,
        data: { user, sessionToken }
    };
};

export const removeSessionToken = async ({userId, sessionToken}) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const user = await mongoSession.db.collection('users').findOne({_id: userId});
    if (user.sessionTokens.includes(sessionToken)) {
        const newSessionTokenArray = user.sessionTokens.filter((token) => token !== sessionToken);
        await mongoSession.db.collection('users').updateOne({_id: user._id}, { $set: { sessionTokens: newSessionTokenArray }});
    }
};

export const getUserBySessionToken = async (sessionToken) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const user = await mongoSession.db.collection('users').findOne({sessionTokens: sessionToken});
    return user;
};

export const verifyApiKey = async ({accountName, apiKey}) => {
    
    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const verified = await mongoSession.user.functions.verifyApiKey(accountName, apiKey);
    return verified;
}

export const getEncountersByAccountName = async (accountName) => {

    if (!mongoSession.user || !mongoSession.db) {
        await login();
    }

    const encounters = await mongoSession.db.collection('encounters').find({ accountNames: accountName });
    return encounters;
};
