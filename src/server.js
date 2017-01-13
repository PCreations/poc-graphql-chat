import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './schema'
/*import express from 'express'
import bodyParser from 'body-parser'
import * as firebase from 'firebase'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { createServer } from 'http'

import { subscriptionManager } from './subscriptions'
import schema from './api/schema'
import {
  AUTH_USER_ID,
  FIREBASE_API_KEY,
  FIREBASE_ID,
  FIREBASE_DATABASE_NAME,
  FIREBASE_STORAGE_BUCKET_NAME
} from './constants'
import { FirebaseConnector } from './api/connector'
import { User as UserModel, Message as MessageModel } from './api/models'

const firebaseConnector = new FirebaseConnector(
  FIREBASE_API_KEY,
  `https://${FIREBASE_ID}.firebaseapp.com`,
  `https://${FIREBASE_DATABASE_NAME}.firebaseio.com`,
  `${FIREBASE_STORAGE_BUCKET_NAME}.appspot.com`
)*/

const PORT = 1337;

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
