// Import the 'idb' package to use with IndexedDB.
import { openDB } from 'idb';

// Create a function that can be used to start up the database.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// add to database portion 
export const postDb = async (content) => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const todosDb = await openDB('todos', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = todosDb.transaction('todos', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('todos');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ todo: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
// Export a function we will use to GET all from the database.
export const getAllDb = async () => {
  console.log('GET all from the database');

  // Create a connection to the database and version we want to use.
  const Db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const getDb = async () => console.error('getDb not implemented');

initdb();
