import { PageResult, University, UniversityForm } from "../types";
import universityApi from "./axios";

export const fetchUniversities = async (page: number) => {
  return await universityApi.get<PageResult>(`/universities`, {
    params: { page },
  });
};

export const createUniversity = async (university: UniversityForm) => {
  return await universityApi.post<University>(`/universities`, { university: university });
};

export const updateUniversity = async (university: University) => {
  return await universityApi.put<University>(`/universities/${university.id}`, { university: university });
};
