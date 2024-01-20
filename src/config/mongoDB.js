const { MongoClient } = require("mongodb");

const uri = process.env.MONGOURI
let singleton;
 
async function connect() {
    if (singleton) return singleton;
 
    const client = new MongoClient(uri);
    await client.connect();
    
    singleton = client.db('Academy');
    
    return singleton;
}

async function connectSession() {
  const client = new MongoClient(uri)
  await client.connect();

  const session = client.startSession();
  const db = client.db('Academy');
  
  return {
    session,
    db
  }
}

module.exports = { 
  connect,
  connectSession
}