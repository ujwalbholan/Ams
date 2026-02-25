import api from "@/lib/api";
import axios, { AxiosError } from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  email: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ServiceError {
  message: string;
  status?: number;
}

const hendelAxiosError = (error: unknown): ServiceError => {
  if (new axios.AxiosError(error)) {
    const axisoError = error as AxiosError<unknown>;
    return {
      message:
        axisoError.response?.data.message ||
        axisoError.message ||
        "something went wrong",
      status: axisoError.response?.status,
    };
  }
  return {
    message: "Error while fetching data",
  };
};

export const authService = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", data);
      return response.data;
    } catch (error) {
      throw hendelAxiosError(error);
    }
  },
  register: async (data: RegisterPayload): Promise<{ message: string }> => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error) {
      throw hendelAxiosError(error);
    }
  },
  refresh: async (refreshToken: string): Promise<{ access_token: string }> => {
    try {
      const response = await api.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      return response.data;
    } catch (error) {
      throw hendelAxiosError(error);
    }
  },
};
