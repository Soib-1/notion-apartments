import { useFormik } from 'formik';
import {
  additionalFacilities,
  apartmentFacilities,
  apartmentSchema,
  bathroomOptions,
  initialValues,
  locationFacilities,
  parkingSpaceOptions,
  renderSelectOptions,
} from './apartments-form.helpers';
import { OptionSet } from './apartments-form.types';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Typography,
} from '@mui/material';
import * as S from './apartments-form.styles';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

export const ApartmentsForm = () => {
  const [token, setToken] = useState<string>('');

  const router = useRouter();
  const { errors, handleChange, handleSubmit, setFieldValue, touched, values } = useFormik({
    initialValues,
    onSubmit: (values) => {
      toast.promise(
        axios.post('/api/submit-apartment', { ...values, captcha: token }).then(() => {
          router.push('/');
        }),
        {
          loading: 'Zgłaszanie...',
          success: 'Zgłoszenie zostało wysłane!',
          error: 'Wystąpił błąd podczas wysyłania zgłoszenia!',
        },
      );
    },
    validationSchema: apartmentSchema,
  });

  const handleOptionsChange = (name: string, values: string[], value: string) => {
    if (values && values.includes(value)) {
      return setFieldValue(
        name,
        values.filter((v) => v !== value),
      );
    }

    return setFieldValue(name, [...values, value]);
  };

  const additionalOptions = ({
    name,
    options,
    values,
  }: {
    name: string;
    options: OptionSet;
    values: string[];
  }) =>
    options.map(({ label, value }) => (
      <S.Options key={value}>
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              id={value}
              name={name}
              onChange={() => handleOptionsChange(name, values, value)}
            />
          }
        />
      </S.Options>
    ));

  return (
    <S.Form onSubmit={handleSubmit}>
      <GoogleReCaptcha
        onVerify={(token) => {
          setToken(token);
        }}
      />
      <S.Section>
        <S.Subheading variant="h4">Lokalizacja</S.Subheading>
        <S.FlexGroup>
          <S.Input
            id="city"
            name="city"
            type="text"
            onChange={handleChange}
            placeholder="Miasto"
            label="Miasto"
            helperText={touched.city && errors.city ? errors.city : ''}
          />
          <S.Input
            id="street"
            name="street"
            type="text"
            onChange={handleChange}
            placeholder="Nazwa ulicy"
            label="Ulica"
            helperText={touched.street && errors.street ? errors.street : ''}
          />
          <S.Input
            id="region"
            name="region"
            type="text"
            onChange={handleChange}
            placeholder="Nazwa regionu"
            label="Region miasta"
            helperText={touched.region && errors.region ? errors.region : ''}
          />
          <Box>
            <Typography>Udogodnienia w lokalizacji</Typography>
            <S.OptionsContainer id="locationFacilities">
              {additionalOptions({
                values: values.locationFacilities,
                name: 'locationFacilities',
                options: locationFacilities,
              })}
            </S.OptionsContainer>
            <Typography />
          </Box>
        </S.FlexGroup>
      </S.Section>
      <S.Divider />
      <S.Section>
        <S.Subheading variant="h4">Mieszkanie</S.Subheading>
        <S.FlexGroup>
          <S.Input
            id="bedSize"
            name="bedSize"
            type="text"
            onChange={handleChange}
            placeholder="King size"
            label="Wielkość łóżka"
            helperText={touched.bedSize && errors.bedSize ? errors.bedSize : ''}
          />
          <S.Input
            id="numberOfBedrooms"
            name="numberOfBedrooms"
            type="number"
            onChange={handleChange}
            placeholder="3"
            label="Liczba sypialni"
            helperText={
              touched.numberOfBedrooms && errors.numberOfBedrooms ? errors.numberOfBedrooms : ''
            }
          />
          <S.Input
            id="numberOfBathrooms"
            name="numberOfBathrooms"
            type="number"
            onChange={handleChange}
            placeholder="2"
            label="Liczba łazienek"
            helperText={
              touched.numberOfBathrooms && errors.numberOfBathrooms ? errors.numberOfBathrooms : ''
            }
          />
          <Box>
            <FormControl>
              <InputLabel id="bathroom">Na wyposażeniu łazienki</InputLabel>
              <S.Dropdown
                defaultValue={values.bathroom}
                labelId="bathroom"
                name="bathroom"
                onChange={handleChange}
                label="Na wyposażeniu łazienki"
              >
                {renderSelectOptions(bathroomOptions)}
              </S.Dropdown>
            </FormControl>
          </Box>
          <Box>
            <Typography>Udogodnienia w mieszkaniu</Typography>
            <S.OptionsContainer id="apartmentFacilities">
              {additionalOptions({
                values: values.apartmentFacilities,
                name: 'apartmentFacilities',
                options: apartmentFacilities,
              })}
            </S.OptionsContainer>
            <Typography />
          </Box>
        </S.FlexGroup>
      </S.Section>
      <S.Divider />
      <S.Section>
        <S.Subheading variant="h4">Koszta</S.Subheading>
        <S.FlexGroup>
          <S.Input
            id="totalPricePerMonth"
            name="totalPricePerMonth"
            type="number"
            onChange={handleChange}
            placeholder="Cena w PLN"
            label="Całkowity koszt na miesiąc"
            helperText={
              touched.totalPricePerMonth && errors.totalPricePerMonth
                ? errors.totalPricePerMonth
                : ''
            }
          />
          <S.Input
            id="deposit"
            name="deposit"
            type="number"
            onChange={handleChange}
            placeholder="Koszt w PLN"
            label="Kaucja"
            helperText={touched.deposit && errors.deposit ? errors.deposit : ''}
          />
          <S.Input
            id="brokerageCommission"
            name="brokerageCommission"
            type="number"
            onChange={handleChange}
            placeholder="Koszt w PLN"
            label="Wysokość prowizji"
            helperText={
              touched.brokerageCommission && errors.brokerageCommission
                ? errors.brokerageCommission
                : ''
            }
          />
        </S.FlexGroup>
      </S.Section>
      <S.Divider />
      <S.Section>
        <S.Subheading variant="h4">Dodatki</S.Subheading>
        <S.FlexGroup>
          <Typography>Prędkość internetu</Typography>
          <S.SliderWrapper>
            <Typography>0Mbps</Typography>
            <S.Slider
              defaultValue={0}
              step={100}
              min={0}
              max={2000}
              marks
              valueLabelDisplay="auto"
              id="internetSpeed"
              name="internetSpeed"
              onChange={(_, value) => setFieldValue('internetSpeed', String(value))}
            />
            <Typography>2000Mbps</Typography>
          </S.SliderWrapper>

          <S.FlexGroup>
            <FormControl>
              <InputLabel id="parkingSpace">Rodzaj parkingu</InputLabel>
              <S.Dropdown
                defaultValue={values.parkingSpace}
                labelId="parkingSpace"
                name="parkingSpace"
                onChange={handleChange}
                label="Rodzaj parkingu"
              >
                {renderSelectOptions(parkingSpaceOptions)}
              </S.Dropdown>
            </FormControl>
          </S.FlexGroup>
          <Box>
            <Typography>Dodatkowe udogodnienia</Typography>
            <S.OptionsContainer id="additionalFacilities">
              {additionalOptions({
                values: values.additionalFacilities,
                name: 'additionalFacilities',
                options: additionalFacilities,
              })}
            </S.OptionsContainer>
            <Typography />
          </Box>
        </S.FlexGroup>
      </S.Section>
      <S.Divider />
      <S.Section>
        <S.Subheading variant="h4">Kontakt</S.Subheading>
        <S.FlexGroup>
          <S.Input
            id="contactNumber"
            name="contactNumber"
            type="text"
            onChange={handleChange}
            placeholder="666 555 444"
            label="Numer kontaktowy"
            helperText={touched.contactNumber && errors.contactNumber ? errors.contactNumber : ''}
          />
          <S.Input
            id="other"
            name="other"
            type="text"
            multiline
            rows={3}
            onChange={handleChange}
            placeholder="Link do oferty itp."
            label="Inne informacje"
            helperText={touched.other && errors.other ? errors.other : ''}
          />
        </S.FlexGroup>
      </S.Section>
      <S.Divider />
      <S.Section>
        <Button variant="contained" type="submit">
          Wyślij zgłoszenie
        </Button>
      </S.Section>
    </S.Form>
  );
};
