import { MenuItem } from '@mui/material';
import * as yup from 'yup';
import { OptionSet } from './apartments-form.types';

export const locationFacilities = [
  {
    value: 'wellness',
    label: 'Spa & Wellness',
  },
  {
    value: 'pool',
    label: 'Basen',
  },
  {
    value: 'gym',
    label: 'Siłownia',
  },
  {
    value: 'coworking',
    label: 'Co-working',
  },
  {
    value: 'supermarket',
    label: 'Supermarket',
  },
  {
    value: 'parcelMachine',
    label: 'Paczkomat',
  },
];
export const apartmentFacilities = [
  {
    value: 'utilityRoom',
    label: 'Pomieszczenie Gospodarcze',
  },
  {
    value: 'bigFridge',
    label: 'Duża lodówka',
  },
  {
    value: 'dryingMachine',
    label: 'Suszarka automatyczna',
  },
  {
    value: 'washingMachine',
    label: 'Pralka',
  },
  {
    value: 'dishWasher',
    label: 'Zmywarka',
  },
];

export const bathroomOptions = [
  {
    value: 'walkInShower',
    label: 'Prysznic typu Walk-in',
  },
  {
    value: 'bath',
    label: 'Wanna',
  },
  {
    value: 'shower',
    label: 'Prysznic',
  },
];

export const additionalFacilities = [
  {
    value: 'floorHeating',
    label: 'Ogrzewanie Podłogowe',
  },
  {
    value: 'airConditioning',
    label: 'Klimatyzacja',
  },
  {
    value: 'dedicatedWorkspace',
    label: 'Wydzielona przestrzeń do pracy',
  },
  {
    value: 'tv',
    label: 'TV',
  },
];

export const parkingSpaceOptions = [
  {
    value: 'undergroundParking',
    label: 'Parking podziemny',
  },
  {
    value: 'garage',
    label: 'Garaż',
  },
  {
    value: 'street',
    label: 'Parking na ulicy',
  },
];

export const apartmentSchema = yup.object().shape({
  city: yup.string().required('Pole wymagane'),
  region: yup.string().required('Te pole jest wymagane!'),
  street: yup.string().required('Te pole jest wymagane!'),
  airConditioning: yup.boolean(),
  bedSize: yup.string().required('Te pole jest wymagane!'),
  tv: yup.boolean(),
  dedicatedWorkspace: yup.boolean(),
  locationFacilities: yup.array(yup.string()),
  floorHeating: yup.boolean(),
  apartmentFacilities: yup.array(yup.string()),
  additionalFacilities: yup.array(yup.string()),
  internetSpeed: yup.string().required('Te pole jest wymagane!'),
  parkingSpace: yup
    .string()
    .required('Te pole jest wymagane!')
    .oneOf(parkingSpaceOptions.map((select) => select.value)),
  bathroom: yup
    .string()
    .required('Te pole jest wymagane!')
    .oneOf(bathroomOptions.map((select) => select.value)),
  numberOfBathrooms: yup.number().positive().required('Te pole jest wymagane!'),
  numberOfBedrooms: yup.number().positive().required('Te pole jest wymagane!'),
  totalPricePerMonth: yup.number().positive().required('Te pole jest wymagane!'),
  deposit: yup.number().positive().required('Te pole jest wymagane!'),
  brokerageCommission: yup.number().positive().required('Te pole jest wymagane!'),
  contactNumber: yup.string().required('Te pole jest wymagane!'),
});

export const renderSelectOptions = (options: OptionSet) =>
  options.map(({ label, value }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));

export const initialValues = {
  city: '',
  region: '',
  street: '',
  airConditioning: false,
  bedSize: '',
  tv: false,
  dedicatedWorkspace: false,
  supermarket: false,
  locationFacilities: [],
  floorHeating: false,
  apartmentFacilities: [],
  additionalFacilities: [],
  internetSpeed: '0',
  parkingSpace: 'street',
  bathroom: 'shower',
  numberOfBedrooms: '',
  numberOfBathrooms: '',
  totalPricePerMonth: '',
  deposit: '',
  brokerageCommission: '',
  contactNumber: '',
};
