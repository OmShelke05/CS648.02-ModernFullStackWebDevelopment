/* eslint linebreak-style: ["error", "windows"] */

const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.DB_URL || 'mongodb+srv://test:test123@freecluster.qty0x.mongodb.net/inventorydb?retryWrites=true&w=majority';

async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB URL ', url);
    const db = client.db();
    const collection = db.collection('employees');
    const employee = { id: 2, name: 'B. Async', age: 16 };
    const result = await collection.insertOne(employee);
    console.log('Result of insert:\n', result.insertedId);
    const docs = await collection.find({ _id: result.insertedId })
      .toArray();
    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  // eslint-disable-next-line no-shadow
  client.connect((err, client) => {
    if (err) {
      callback(err);
      return;
    }
    console.log('Connected to MongoDB URL ', url);
    const db = client.db();
    const collection = db.collection('employees');
    const employee = { id: 1, name: 'A. Callback', age: 23 };
    // eslint-disable-next-line no-shadow
    collection.insertOne(employee, (err, result) => {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId })
        // eslint-disable-next-line no-shadow
        .toArray((err, docs) => {
          if (err) {
            client.close();
            callback(err);
            return;
          }
          console.log('Result of find:\n', docs);
          client.close();
          callback(err);
        });
    });
  });
}
testWithCallbacks((err) => {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
