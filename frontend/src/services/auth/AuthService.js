export class AuthService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async login(credentials) {
    return this.strategy.authenticate(credentials);
  }

  async logout() {
    return this.strategy.logout();
  }

  async register(userData) {
    return this.strategy.register(userData);
  }
}
