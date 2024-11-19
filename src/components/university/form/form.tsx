import { Button, Input } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { University, formData } from '../../../types';

interface FormProps {
  onClose: () => void;
  university?: University;
  onSubmit: (payload: formData) => void;
  isReadOnly?: boolean;
}

const Form = ({ onClose, university, onSubmit, isReadOnly = false }: FormProps) => {
  const universitySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    location: z.string().min(1, 'Location is required'),
    contact_emails: z
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
      .url('Website must be a valid URL - e.g. https://example.com')
      .min(1, 'Website is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      id: university?.id,
      name: university?.name ?? '',
      location: university?.location ?? '',
      contact_emails: university?.contact_emails.join(',') ?? '',
      website: university?.website ?? ''
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit((payload) => {
        onSubmit({ ...payload, id: university?.id })
      })}>
        <h2 className="text-xl font-bold mb-4">University Form</h2>
        <div className="mb-4">
          <Input
            type="text"
            hidden
            className="w-full px-3 py-2 border rounded"
            {...register('id')}
          />
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            disabled={isReadOnly}
            {...register('name')}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            disabled={isReadOnly}
            {...register('location')}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contact Emails (comma separated)</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            disabled={isReadOnly}
            {...register('contact_emails')}
          />
          {errors.contact_emails && (
            <p className="text-red-500 text-sm">{errors.contact_emails.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            type="text"
            className="w-full px-3 py-2 border rounded"
            disabled={isReadOnly}
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
          { !isReadOnly ? (
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </Button>
          ) : null }
        </div>
      </form>
    </>
  );
};

export default Form;
