const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// midleware
app.use(cors())
app.use(express.json())






// DataBase


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vvsc5ct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const UserCollection = client.db('octalink').collection('user');


    app.get('/user', async(req, res) => {
      const cursor = UserCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/user/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await UserCollection.findOne(query);
      res.send(result);
    })

    app.post('/user', async(req, res) => {
      const newUser = req.body;
      console.log(newUser);
      const result = await UserCollection.insertOne(newUser);
      res.send(result);
    })

    app.put('/user/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateUserDetails = req.body;
      const User = {
        $set: {
          name: updateUserDetails.name,
          image: updateUserDetails.image,
        }
      }

      const result = await UserCollection.updateOne(filter, User, options);
      res.send(result);
     })



     app.put('/user/role/:id',   async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateUserDetails = req.body;

      const User = {
        $set: {
          role: updateUserDetails.role,    
        }
      }

      const result = await UserCollection.updateOne(filter, User, options);
      res.send(result);
     })




    // User Message


    const MessageCollection = client.db('octalink').collection('userMessage');


    app.get('/usermessage', async(req, res) => {
      const cursor = MessageCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


      app.post('/usermessage', async(req, res) => {
      const newMessage = req.body;
      console.log(newMessage);
      const result = await MessageCollection.insertOne(newMessage);
      res.send(result);
    })


    app.put('/usermessage/status/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateMessageDetails = req.body;

      const Message = {
        $set: {
          status: updateMessageDetails.status,    
        }
      }

      const result = await MessageCollection.updateOne(filter, Message, options);
      res.send(result);
     })


     app.delete('/usermessage/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await MessageCollection.deleteOne(query);
      res.send(result);
    })



    // Products Collection

    const ProductsCollection = client.db('octalink').collection('products');


    app.get('/products', async(req, res) => {
      const cursor = ProductsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/products/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await ProductsCollection.findOne(query);
      res.send(result);
    })


    app.post('/products', async(req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await ProductsCollection.insertOne(newProduct);
      res.send(result);
    })


    app.put('/products/image/:id',  async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const productDetails = req.body;

      const Product = {
        $set: {
          category: productDetails.category,
          subcategory: productDetails.subcategory,
          image: productDetails.image,    
           
        }
      }

      const result = await ProductsCollection.updateOne(filter, Product, options);
      res.send(result);
     })


     app.delete('/products/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await ProductsCollection.deleteOne(query);
      res.send(result);
    })



    const ReviewCollection = client.db('octalink').collection('reviews');


    app.get('/reviews', async(req, res) => {
      const cursor = ReviewCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })










    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.get('/', (req, res) => {
  res.send('Octalink Server Is Running')
})

app.listen(port, () => {
  console.log(`Octalink-server is running on port ${port}`)
})