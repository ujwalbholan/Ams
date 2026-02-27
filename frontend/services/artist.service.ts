import api from "@/lib/api";
import { AxiosError } from "axios";

export interface ArtistPayload {
  name: string;
  dob: string;
  gender: "m" | "f";
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
}

export interface Artist {
  id: number;
  name: string;
  dob: string;
  gender: "m" | "f";
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
  created_at: string;
  updated_at: string;
}

export interface GetArtistsResponse {
  data: Artist[];
  total: number;
  page: number;
  limit: number;
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

export const artistService = {
  createArtist: async (data: ArtistPayload): Promise<Artist> => {
    try {
      const response = await api.post<Artist>("/artist", data);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  getArtists: async (
    page: number,
    limit: number,
  ): Promise<GetArtistsResponse> => {
    try {
      const response = await api.get<GetArtistsResponse>(
        `/artist?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  getArtistById: async (id: number): Promise<Artist> => {
    try {
      const response = await api.get<Artist>(`/artist/${id}`);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  updateArtist: async (
    id: number,
    data: Partial<ArtistPayload>,
  ): Promise<Artist> => {
    try {
      const response = await api.put<Artist>(`/artist/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },

  deleteArtist: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(`/artist/${id}`);
      return response.data;
    } catch (error: unknown) {
      throw handleAxiosError(error);
    }
  },
};
