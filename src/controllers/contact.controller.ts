import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Contact, { Contact as ContactModel } from '../models/contact.model';

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestData = req.body;    
    requestData.image_url = faker.image.people(500, 500, true);
    const newContact: ContactModel = await Contact.create(requestData);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page: number = parseInt(req.query.page as string ?? 1);
    const limit: number = parseInt(req.query.limit as string ?? 50);
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;
    const totalContacts: number = await Contact.countDocuments({});
    const contacts: ContactModel[] = await Contact.find().skip(startIndex).limit(limit);

    const pagination: { totalContacts: number; totalPages: number; currentPage: number, nextPage: number, prevPage: number } = {
      totalContacts,
      totalPages: Math.ceil(totalContacts / limit),
      currentPage: page,
      nextPage: 0,
      prevPage: 0,
    };

    // Check if there is a next page
    if (endIndex < totalContacts) {
      pagination.nextPage = page + 1;
    }

    // Check if there is a previous page
    if (startIndex > 0) {
      pagination.prevPage = page - 1;
    }
    
    res.json({contacts, pagination});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedContact: ContactModel | null = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getImageUrl = async () => {
  const imageUrl: string = process.env.RANDOM_IMAGE_URL ?? '';
  fetch(imageUrl)
  .then(response => {
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  return imageUrl;
};