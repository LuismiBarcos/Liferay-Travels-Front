import AuthorizationService from "../api/AuthorizationService";
import { client, getUserAccountSitesQuery } from "../api/Client";

export default class LoginService {
  /**
   * Login in the app. Return true if login is correct or false in other case
   * @param {String} username
   * @param {String} password
   */
  async login(username, password) {
    const basicAuthToken = AuthorizationService.createBasicAuthorizationToken(
      username,
      password
    );
    return checkLoginCredentials(basicAuthToken);
  }

  /**
   * Logout of the application
   */
  logout() {
    localStorage.removeItem("token");
    window.location.replace(`/`);
  }

  /**
   * Check if the user is logged
   */
  isLogin() {
    return !!localStorage.getItem("token");
  }
}

const checkLoginCredentials = async (basicAuthToken) => {
  localStorage.setItem("token", basicAuthToken);
  return client
    .query({
      query: getUserAccountSitesQuery,
    })
    .then((response) => {
      const groupId = response.data.myUserAccountSites.items[0].id;
      localStorage.setItem("groupId", groupId);
      window.location.replace(`/`);
      return true;
    })
    .catch(() => {
      localStorage.removeItem("token");
      return false;
    });
};
