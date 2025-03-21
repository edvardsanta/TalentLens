import { AuthService } from "@/services/auth/AuthService";
import { MockAuthStrategy } from "@/services/auth/strategy/MockAuthStrategy";
import { DefaultAuthStrategy } from "@/services/auth/strategy/DefaultAuthStrategy";

const AuthStrategyType = {
  MOCK: "mock",
  API: "api",
};

const configureAuthService = (type = AuthStrategyType.MOCK, config = {}) => {
  switch (type) {
    case AuthStrategyType.MOCK:
      return new AuthService(
        new MockAuthStrategy(config.mockUsers),
      );
    case AuthStrategyType.API:
      return new AuthService(new DefaultAuthStrategy(config.apiUrl));
    default:
      throw new Error("Invalid authentication strategy type");
  }
};

Object.freeze(AuthStrategyType);
export { configureAuthService, AuthStrategyType };
