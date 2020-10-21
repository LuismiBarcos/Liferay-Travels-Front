import LoginService from "../services/LoginService";

export default class AppBarViewModel {
  constructor() {
    this.loginService = new LoginService();
  }

  logout() {
    this.loginService.logout();
  }

  handleSearchTerm(searchTerm) {
    window.location.replace(searchTerm ? `?search=${searchTerm}` : `/`);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}
