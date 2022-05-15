import { InferType } from 'yup';
import { apartmentSchema } from './apartments-form.helpers';

export interface Apartment extends InferType<typeof apartmentSchema> {}

interface Option {
  label: string;
  value: string;
}

export type OptionSet = Array<Option>;
