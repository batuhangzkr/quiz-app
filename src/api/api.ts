import axios from "axios";
import { ApiResponse } from "../types/types";

export const fetchQuestions = async (
    amount: number,
    category?: number,
    difficulty?: string
): Promise<ApiResponse> => {
    const API_URL = `https://opentdb.com/api.php?amount=${amount}${category ? `&category=${category}` : ""
        }${difficulty ? `&difficulty=${difficulty}` : ""}&type=multiple`;

    const response = await axios.get<ApiResponse>(API_URL);
    return response.data;
};
