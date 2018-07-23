export default class Store {

  static setItem(key, value) {
    localStorage.setItem(key, value)
  }

  static getItem(key) {

    return localStorage.getItem(key)
  }

  static deleteItem(key) {
    localStorage.removeItem(key)
  }

  static setSessionItem(key, value) {
    sessionStorage.setItem(key, value)
  }

  static getSessionItem(key) {

    return sessionStorage.getItem(key)
  }

  static deleteSessionItem(key) {
    sessionStorage.removeItem(key)
  }
}
