import { PageResult } from "../types";
import universityApi from "./axios";

export const fetchUniversities = async (page: number) => {
  return await universityApi.get<PageResult>(`/universities?page=${page}`, {
    params: { page },
  });
};
