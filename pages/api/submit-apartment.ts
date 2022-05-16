import { Apartment } from 'components/apartments-form/apartments-form.types';
import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Apartment & { captcha: string };
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `${req.method} requests are not allowed` });
  }

  try {
    const {
      additionalFacilities,
      apartmentFacilities,
      bathroom,
      bedSize,
      brokerageCommission,
      captcha,
      city,
      contactNumber,
      deposit,
      internetSpeed,
      locationFacilities,
      numberOfBathrooms,
      numberOfBedrooms,
      other,
      parkingSpace,
      region,
      street,
      totalPricePerMonth,
    } = req.body;

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        method: 'POST',
      },
    );
    const captchaValidation = await response.json();

    if (!captchaValidation.success) {
      return res.status(400).json({ message: 'Captcha validation failed' });
    }

    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID ?? '',
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: req.headers.referer || '',
              },
            },
          ],
        },
        City: {
          rich_text: [
            {
              text: {
                content: city,
              },
            },
          ],
        },
        Region: {
          rich_text: [
            {
              text: {
                content: region,
              },
            },
          ],
        },
        Street: {
          rich_text: [
            {
              text: {
                content: street,
              },
            },
          ],
        },
        BedSize: {
          rich_text: [
            {
              text: {
                content: bedSize,
              },
            },
          ],
        },
        LocationFacilities: {
          multi_select: [
            ...(locationFacilities?.map((facility) => ({
              name: facility || '',
            })) || []),
          ],
        },
        ApartmentFacilities: {
          multi_select: [
            ...(apartmentFacilities?.map((facility) => ({
              name: facility || '',
            })) || []),
          ],
        },
        AdditionalFacilities: {
          multi_select: [
            ...(additionalFacilities?.map((facility) => ({
              name: facility || '',
            })) || []),
          ],
        },
        InternetSpeed: {
          rich_text: [
            {
              text: {
                content: internetSpeed,
              },
            },
          ],
        },
        ParkingSpace: {
          select: {
            name: parkingSpace,
          },
        },
        Bathroom: {
          multi_select: [
            ...(bathroom?.map((bathroom) => ({
              name: bathroom || '',
            })) || []),
          ],
        },
        NumberOfBathrooms: {
          number: numberOfBathrooms,
        },
        NumberOfBedrooms: {
          number: numberOfBedrooms,
        },
        TotalPricePerMonth: {
          number: totalPricePerMonth,
        },
        Deposit: {
          number: deposit,
        },
        BrokerageCommission: {
          number: brokerageCommission,
        },
        ContactNumber: {
          rich_text: [
            {
              text: {
                content: contactNumber,
              },
            },
          ],
        },
        Other: {
          rich_text: [
            {
              text: {
                content: other || '',
              },
            },
          ],
        },
        DateSubmitted: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });
    res.status(201).json({ msg: 'Success' });
  } catch {
    res.status(500).json({ msg: 'There was an error' });
  }
}
