import { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const initAuth = async () => {

      try {

        const token = localStorage.getItem("accessToken");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await getProfile();

        setUser(res);

      } catch {

        setUser(null);

      } finally {

        setLoading(false);
      }
    };

    initAuth();

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};