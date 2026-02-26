import api from "@/lib/api";
import { AxiosError } from "axios";

export interface MusicPayload {
  artist_id: number;
  title: string;
  album_name: string;
  genre: string;
}

export interface Music {
  id: number;
  artist_id: number;
  title: string;
  album_name: string;
  genre: string;
  created_at: string;
  updated_at: string;
}

interface ServiceError {
  message: string;
  status?: number;
}

const handleAxiosError = (error: unknown): ServiceError => {
  if (error instanceof AxiosError) {
    return {
      message: (error.response?.data as any)?.message || error.message,
      status: error.response?.status,
    };
  }
  return { message: "Something went wrong" };
};

export const musicService = {
  createMusic: async (data: MusicPayload): Promise<Music> => {
    try {
      const response = await api.post<Music>("/music", data);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  getAllMusic: async (): Promise<Music[]> => {
    try {
      const response = await api.get<Music[]>("/music");
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  getMusicById: async (id: number): Promise<Music> => {
    try {
      const response = await api.get<Music>(`/music/${id}`);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  updateMusic: async (id: number, data: MusicPayload): Promise<Music> => {
    try {
      const response = await api.put<Music>(`/music/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  deleteMusic: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(`/music/${id}`);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },
};
