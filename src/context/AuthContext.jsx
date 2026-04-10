import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch role from DB
  const fetchRole = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Role fetch error:", error);
      return;
    }

    setRole(data.role);
  };

  useEffect(() => {
    // 🔥 restore session on refresh
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        setUser(data.session.user);
        await fetchRole(data.session.user.id);
      }

      setLoading(false);
    };

    getSession();

    // 🔥 listen login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchRole(session.user.id);
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 real login
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  // 🔹 real logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};