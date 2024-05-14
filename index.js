const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "https://kajer-khoj.web.app",
            "https://kajer-khoj.firebaseapp.com"
        ],
        credentials: true,
    }
));
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.qexkjce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();

        const alljobscollection = client.db('jobDB').collection('jobs');
        const appliedjobscollection = client.db('jobDB').collection('apply');

        // Data collect form Job database
        app.get('/joblist', async (req, res) => {
            const cursor = alljobscollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Data collect from Job database by id
        app.get('/joblist/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await alljobscollection.findOne(query);
            res.send(result);
        })

        // Data create on job database
        app.post('/joblist', async (req, res) => {
            const newjob = req.body;
            const result = await alljobscollection.insertOne(newjob);
            res.send(result);
        })

        // Data updated on job database
        app.put('/joblist/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedjob = req.body;
            const updated = {
                $set: {
                    jobtitle: updatedjob.jobtitle,
                    jobcategory: updatedjob.jobcategory,
                    imageurl: updatedjob.imageurl,
                    description: updatedjob.description,
                    salaryrange: updatedjob.salaryrange,
                    applicationdeadline: updatedjob.applicationdeadline,
                    experience: updatedjob.experience,
                    address: updatedjob.address
                }
            }
            const result = await alljobscollection.updateOne(filter, updated);
            res.send(result);
        })

        // Data updated on job database
        app.put('/joblist/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedjob = req.body;
            const updated = {
                $set: {
                    jobapplicants: updatedjob.jobapplicants
                }
            }
            const result = await alljobscollection.updateOne(filter, updated);
            res.send(result);
        })

        // Data delete in jobs database by id
        app.delete('/joblist/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await alljobscollection.deleteOne(query);
            res.send(result);
        })


        // Data collect form Job database
        app.get('/applylist', async (req, res) => {
            const cursor = appliedjobscollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Data create on appliedjob database
        app.post('/applylist', async (req, res) => {
            const newapply = req.body;
            const result = await appliedjobscollection.insertOne(newapply);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Kajer-Khoj-server is running...')
})

app.listen(port, () => {
    console.log(`Kajer-Khoj-server is running on port : ${port}`)
})