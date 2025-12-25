import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:sJIQWugYx4c1fE2w670DCilB9U5LKh83@43.135.143.181:30154'
const MONGODB_DB = process.env.MONGODB_DB || 'gycc'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Global type declaration for caching the connection
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the connection
  // is preserved across hot-reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, create a new client for each request
  client = new MongoClient(MONGODB_URI)
  clientPromise = client.connect()
}

// Export the client promise for use in API routes
export default clientPromise

// Helper function to get the database instance
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db(MONGODB_DB)
}

// Helper function to get a specific collection
export async function getCollection<T extends Document>(collectionName: string) {
  const db = await getDatabase()
  return db.collection<T>(collectionName)
}

