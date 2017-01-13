/* @flow */
import { FirebaseConnector } from './connector'

export class User {
  connector: FirebaseConnector
  constructor(connector: FirebaseConnector) {
    this.connector = connector
  }
  getById(id: string): Promise<{}> {
    return this.connector.get(`users/${id}`)
  }
  addOnUsersChanges(listener: () => {}): Promise<[{}]> {
    return this.connector.on('users', listener)
  }
}

export class Message {
  connector: FirebaseConnector
  rootPath: string
  constructor(connector: FirebaseConnector) {
    this.connector = connector
    this.rootPath = 'messages'
  }
  getAll(): Promise<[{}]> {
    return this.connector.get(this.rootPath)
  }
  getById(id: string): Promise<{}> {
    return this.connector.get(`${this.rootPath}/${id}`)
  }
  add(content: string, userId: string): Promise<string> {
    return this.connector.push(this.rootPath, {
      createdAt: + new Date,
      content,
      userId
    })
  }
  addNewMessagesListener(listener: () => {}): Promise<[{}]> {
    return this.connector.on(this.rootPath, listener)
  }
}
