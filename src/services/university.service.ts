import { PageResult, University, UniversityForm } from "../types";
import universityApi from "./axios";

export const fetchUniversities = async (page: number, searchQuery: string = '') => {
  return await universityApi.get<PageResult>(`/universities`, {
    params: { page, search: searchQuery.trim() }
  });
};

export const createUniversity = async (university: UniversityForm) => {
  return await universityApi.post<University>(`/universities`, { university: university });
};

export const updateUniversity = async (university: University) => {
  return await universityApi.put<University>(`/universities/${university.id}`, { university: university });
};

export const deleteUniversity = async (universityId: number) => {
  return await universityApi.delete<University>(`/universities/${universityId}`);
};
