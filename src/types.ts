export type University = {
  id: number;
  name: string;
  location: string;
  contact_emails: string[];
  website: string;
}

export type PageResult = {
  universities: University[];
  page_info: PageInfo
}

export type PageInfo = {
  current_page: number;
  total_pages: number;
  total_entries: number;
}

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export type UniversityForm = {
  name: string;
  location: string;
  contact_emails: string[];
  website: string;
}
