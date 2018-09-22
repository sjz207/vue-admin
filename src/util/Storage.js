import * as $cookies from "vue-cookies";

export default class Storage {

  static defaultExpireTimes = 30 * 60;

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

  static clearSessionStorage() {
    sessionStorage.clear()
  }

  static clearLocalStorage() {
    localStorage.clear()
  }

  static clearStorage() {
    this.clearSessionStorage()
    this.clearLocalStorage()
  }

  static setCookie(key, value, expireTimes = this.defaultExpireTimes) {

    $cookies.set(key, value, expireTimes)
  }

  static getCookies(key) {
    return $cookies.get(key)
  }

  static deleteCookies(key) {
    $cookies.remove(key)
  }
}
