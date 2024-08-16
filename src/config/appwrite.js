import { Client, Account, Databases, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_PROJECT_ENDPOINT) 
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); 

const account = new Account(client);
const database = new Databases(client)

export const fetchFavourites = async (userId) => {
  try {
      const response = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE, process.env.NEXT_PUBLIC_COLLECTIONS, [
          Query.equal('userId', userId),
      ]);
      return response.documents;
  } catch (error) {
      console.error("Error fetching favorites:", error);
  }
};

export const addFavourite = async (userId, place) => {

  try {
      const response = await database.createDocument(process.env.NEXT_PUBLIC_DATABASE,  process.env.NEXT_PUBLIC_COLLECTIONS, 'unique()', {
          userId ,
          placeId: place.id,
          name: place.name,
          formatted_address: place.formatted_address,
          photo_ref: place.photos ? place.photos[0].photo_reference : '',
          rating: place.rating
      });
      return response;
  } catch (error) {
    console.log(typeof(place.rating))
      console.error("Error adding favorite:", error);
  }
};

export const removeFavourite = async (documentId) => {
  try {
      await database.deleteDocument(process.env.NEXT_PUBLIC_DATABASE,  process.env.NEXT_PUBLIC_COLLECTIONS, documentId);
  } catch (error) {
      console.error("Error removing favorite:", error);
  }
};


export { client, account };