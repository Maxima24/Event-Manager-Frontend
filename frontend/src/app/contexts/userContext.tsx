"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  isCompleted: boolean;
  role: number;
  status: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
interface userContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    phoneNumber: string,
    lastName: string,
    firstName: string,
    whatsappNUmber: string
  ) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}
 export const AuthContext = createContext<userContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await api.get(`/protected/users/current`);
      return res.data.data.user;
    },
    retry: false, // this works here
  });
  const signupMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      whatsappNumber,
    }: {
      email: String;
      password: string;
      phoneNumber: string;
      firstName: string;
      lastName: String;
      whatsappNumber: string;
    }) => {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/public/auth/register`,
        { email, password, phoneNumber, firstName, lastName, whatsappNumber },
        { withCredentials: true }
      );

      return res.data;
    },
    onSuccess: () => {
      router.push("/home");
    },
  });
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await api.post(
        `/public/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      router.push("/home");
    },
  });
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post(`/public/logout-all`);
    },
    onSuccess: async () => {
      queryClient.setQueryData(["authUser"], null);
      router.push("auth/login");
    },
  });
  const signup = async (
    email: string,
    password: string,
    phoneNumber: string,
    lastName: string,
    firstName: string,
    whatsappNumber: string
  ) => {
    await signupMutation.mutateAsync({
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      whatsappNumber,
    });
  };
  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

