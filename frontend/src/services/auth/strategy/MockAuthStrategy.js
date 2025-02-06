export class MockAuthStrategy {
  constructor(mockUsers = []) {
    this.mockUsers = mockUsers;
  }

  async authenticate({ username, password }) {
    const user = this.mockUsers.find(
      (user) => user.username === username && user.password === password,
    );

    if (user) {
      return user;
    }
    throw new Error("Invalid username or password");
  }

  async logout() {
    return null;
  }

  async register({ username, password, email }) {
    const userExists = this.mockUsers.some(
      (user) => user.username === username,
    );
    if (userExists) {
      throw new Error("Username already exists");
    }

    const newUser = {
      id: this.mockUsers.length + 1,
      username,
      password,
      email,
    };

    this.mockUsers.push(newUser);

    return newUser;
  }
}
