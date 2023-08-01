const { ObjectId } = require("mongodb");
const dbName = "blog";
const coll = "pages";
let db;

module.exports = {
  getDb: async (client) => {
    db = await client.db(dbName);
  },

  getAllDocs: async (offset = 0, limit = 3) => {
    let query = db.collection(coll).find();
    if (offset > 0) {
      query = query.skip(offset);
    }
    query = query.limit(limit);
    return await query.toArray();
  },

  addDoc: async (doc) => {
    return await db.collection(coll).insertOne(doc);
  },

  deleteDoc: async (id) => {
    const filter = { _id: new ObjectId(id) };
    return await db.collection(coll).deleteOne(filter);
  },

  updateDoc: async (id, updatedValues) => {
    const filter = { _id: new ObjectId(id) };
    const update = { $set: updatedValues };
    await db.collection(coll6).updateOne(filter, update);
  },

  getDocById: async (id) => {
    const filter = { _id: new ObjectId(id) };
    return await db.collection(coll).findOne(filter);
  },
};
