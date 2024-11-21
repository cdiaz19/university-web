import { cleanUniversityData } from './cleanUniversityData';
import { formData } from '../types';

describe('cleanUniversityData', () => {
  it('cleans and formats the university data correctly', () => {
    const universityInput: formData = {
      id: 123,
      name: ' Example University ',
      location: ' Some Location ',
      contact_emails: 'test@example.com,example@test.com ',
      website: ' http://example.com '
    };

    const expected = {
      id: universityInput.id,
      name: universityInput.name.trim(),
      location: universityInput.location.trim(),
      contact_emails: ['test@example.com', 'example@test.com'],
      website: universityInput.website.trim()
    };

    const result = cleanUniversityData(universityInput);

    expect(result).toEqual(expected);
  });

  it('handles empty contact_emails if they are empty string', () => {
    const universityInput: formData = {
      id: 123,
      name: ' Example University ',
      location: ' Some Location ',
      contact_emails: '',
      website: ' http://example.com '
    };

    const expected = {
      id: universityInput.id,
      name: universityInput.name.trim(),
      location: universityInput.location.trim(),
      contact_emails: [''],
      website: universityInput.website.trim()
    };

    const result = cleanUniversityData(universityInput);

    expect(result).toEqual(expected);
  });
});
