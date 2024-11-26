const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://nurmahammadmondolrobiul:CEXpIkFJKFpdjfE3@cluster0.ackxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('usersInfoDB');
    const usersInfo = database.collection('userInfo');

    app.get('/info', async (req, res) => {
      const cursor = usersInfo.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/info/:id', async (req, res) => {
      const ID = req.params.id;
      const checkID = { _id: new ObjectId(ID) };
      const result = await usersInfo.findOne(checkID);
      res.send(result);
    });

    app.post('/info', async (req, res) => {
      const info = req.body;
      console.log(info);
      const result = await usersInfo.insertOne(info);
      res.send(result);
    });

    app.put('/info/:id', async (req, res) => {
      const ID = req.params.id;
      const Info = req.body;
      // console.log(ID, updateInfo);

      const filter = { _id: new ObjectId(ID) };
      const updateInfo = {
        $set: {
          name: Info.name,
          email: Info.email,
          book: Info.book,
        },
      };

      const result = await usersInfo.updateOne(filter, updateInfo);
      res.send(result);
    });

    app.delete('/info/:id', async (req, res) => {
      const ID = req.params.id;
      console.log(ID);
      const rightId = { _id: new ObjectId(ID) };
      const result = await usersInfo.deleteOne(rightId);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hallo this is my new server & i added this server books data');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
