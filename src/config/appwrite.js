import { Client, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_PROJECT_ENDPOINT) // Your Appwrite Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

const account = new Account(client);

export { client, account };