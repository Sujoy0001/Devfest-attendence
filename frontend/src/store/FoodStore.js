import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const foodqr = create((set) => ({
  response: null,
  loading: false,

  scanQr: async (unique_id) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_URL}/check_food`, { unique_id });
      set({ response: res.data });
    } catch (error) {
      console.error(error);
      set({ response: { status: "error", error: "Failed to fetch data" } });
    } finally {
      set({ loading: false });
    }
  },

  resetResponse: () => set({ response: null }),
}));