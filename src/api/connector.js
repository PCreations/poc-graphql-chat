/* @flow */
import * as firebase from 'firebase'

export class FirebaseConnector {
  _firebase: any
  _database: any
  constructor(apiKey: string, authDomain: string, databaseURL: string, storageBucket: string) {
    this._firebase = firebase.initializeApp({
      apiKey, authDomain, databaseURL, storageBucket
    })
    this._database = this._firebase.database()
  }
  ref(path: string): any {
    return this._database.ref(path)
  }
  get(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.ref(path).on('value', snapshot => {
            resolve(snapshot.val())
        })
    })
  }
  on(path: string, listener: () => {}): Promise<any> {
    return this.ref(path).on('value', snapshot => listener(snapshot.val()))
  }
  push(path: string, data: {}): Promise<string> {
    const ref = this.ref(path).push()
    ref.set({
      id: ref.key,
      ...data,
    })
    return Promise.resolve(ref.key)
  }
}
