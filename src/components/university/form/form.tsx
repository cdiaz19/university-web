import { Button, Input } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUniversity, updateUniversity } from '../../../services';
import { useEffect } from 'react';
import { University } from '../../../types';

interface formData {
  name: string;
  location: string;
  contactEmails: string;
  website: string;
}

interface FormProps {
  onClose: () => void;
  university: University | null;
}

const Form = ({ onClose, university } : FormProps) =>  {

  const universitySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    location: z.string().min(1, 'Location is required'),
    contactEmails: z
      .string()
      .min(1, 'Contact Emails are required')
      .refine(
        (value) =>
          value.split(',').every((email) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
          ),
        { message: 'Please provide valid email(s)' }
      ),
    website: z
      .string()
      .url('Website must be a valid URL')
      .min(1, 'Website is required'),
  })

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<formData>({ resolver: zodResolver(universitySchema) });

  useEffect(() => {
    if (university) {
      setValue('name', university.name);
      setValue('location', university.location);
      setValue('contactEmails', university.contact_emails?.join(','));
      setValue('website', university.website);
    }
  }, [university, setValue]);

  const onSubmit = async (payload: formData) => {
    try {
      const universityPayload = cleanUniversityData(payload);

      const { data } = university
      ? await updateUniversity(universityPayload)
      : await createUniversity(universityPayload);

      if (data) {
        console.log('data, ', data);
        onClose();
      } else {
        throw new Error(university ? 'Failed to update university' : 'Failed to add university');
      }
    } catch (error) {
      console.error('Error adding university:', error);
    }
  };

  const cleanUniversityData = (payload: formData) => {
    const universityData: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      name: payload.name.trim(),
      location: payload.location.trim(),
      contact_emails: payload.contactEmails.split(',').map(email => email.trim()),
      website: payload.website.trim()
    };

    if (university) {
      universityData.id = university.id;
    }

    return universityData;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold mb-4">University Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            {...register('name')}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            {...register('location')}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contact Emails (comma separated)</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            {...register('contactEmails')}
          />
          {errors.contactEmails && (
            <p className="text-red-500 text-sm">{errors.contactEmails.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            {...register('website')}
          />
          {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
