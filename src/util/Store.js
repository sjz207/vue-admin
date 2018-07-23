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
}
