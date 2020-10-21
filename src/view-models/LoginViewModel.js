import LoginService from "../services/LoginService";

export default class LoginViewModel {
  constructor() {
    this.loginService = new LoginService();
  }
  /**
   * Login in the app. Return true if login is correct or false in other case
   * @param {String} username
   * @param {String} password
   */
  async login(username, password) {
    return this.loginService
      .login(username, password)
      .then((loginSuccess) => loginSuccess)
      .catch((loginSuccess) => loginSuccess);
  }

  /**
   * Logout of the application
   */
  logout() {
    this.loginService.logout();
  }

  /**
   * Check if the user is logged
   */
  isLogin() {
    return this.loginService.isLogin();
  }
}
