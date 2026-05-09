import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserProfile, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  loginMock: (phoneNumber: string, role?: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  profile: null, 
  loading: true, 
  loginMock: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loginMock = (phoneNumber: string, role: UserRole = UserRole.ADMIN) => {
    setLoading(true);
    const mockUser = { uid: "mock-uid-" + phoneNumber, phoneNumber } as User;
    const mockProfile: UserProfile = {
      id: mockUser.uid,
      phoneNumber,
      fullName: role === UserRole.ADMIN ? "مدیر کل سیستم" : "کاربر آزمایشی",
      role,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    setProfile(mockProfile);
    setLoading(false);
    localStorage.setItem("mockUser", JSON.stringify({ user: mockUser, profile: mockProfile }));
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("mockUser");
  };

  useEffect(() => {
    const saved = localStorage.getItem("mockUser");
    if (saved) {
      const { user: u, profile: p } = JSON.parse(saved);
      setUser(u);
      setProfile(p);
      setLoading(false);
      return;
    }

    return onAuthStateChanged(auth, async (firebaseUser) => {
      // ... existing firebase logic ...
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
