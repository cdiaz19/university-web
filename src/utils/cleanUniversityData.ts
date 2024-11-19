import { formData } from "../types";

export const cleanUniversityData = (payload: formData) => {
  return {
    id: payload.id,
    name: payload.name.trim(),
    location: payload.location.trim(),
    contact_emails: payload.contact_emails?.split(',').map(email => email.trim()),
    website: payload.website.trim()
  };
};
