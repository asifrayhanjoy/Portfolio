import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const options = {};

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

const clientPromise = {
  then(onfulfilled?: any, onrejected?: any) {
    return getClientPromise().then(onfulfilled, onrejected);
  },
  catch(onrejected?: any) {
    return getClientPromise().catch(onrejected);
  },
  finally(onfinally?: any) {
    return getClientPromise().finally(onfinally);
  },
} as Promise<MongoClient>;

export default clientPromise;

