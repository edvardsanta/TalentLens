import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
class User {
  constructor(user, pass){
    this.username = user;
    this.password = pass
  }
}
var user = null
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log(userData)
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  console.log(user)
  return user;
};

export const createAuth = (u) => {
  console.log(u)
  user =  new User(u.username, u.password);
};
