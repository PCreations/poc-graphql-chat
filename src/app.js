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
)
const user = new UserModel(firebaseConnector)
const message = new MessageModel(firebaseConnector)

export default {
  models: { user, message }
}
