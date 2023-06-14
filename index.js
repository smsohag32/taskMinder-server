const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54e8hqg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})



async function run() {
  try {
      
      const taskCollection = client.db('taskDB').collection('task')


    //   get all task api in the database 
    app.get('/task/all', async(req,res)=>{
        const allTaskResult = await taskCollection.find().toArray();
        res.send(allTaskResult);
    })
    //   task add api in db save task
      app.post('/task/add', async(req, res)=>{
        const task = req.body;
        if(!task){
            res.status(400).send({error: true, message: 'No task data provided.'})
        }
        const taskAddedResult = await taskCollection.insertOne(task);
        res.send(taskAddedResult);
      } )

   
    //   delete a task 
    app.delete('/task/:id', async(req,res)=> {
        const id = req.params.id;
        if(!id){
            res.status(400).send({error: true, message: 'No task found.'})
        }
        const query = {_id: new ObjectId(id)};
        const result = await taskCollection.deleteOne(query);
        res.send(result);
    })


    // update info in task 
    app.put('/task/update/:id', async(req, res) =>{
      const id = req.params.id;
      const body = req.body;

      const query  = {_id: new ObjectId(id)};
      const updatedTask = {
        $set: {
          task_title: body?.task_title,
          task_description: body?.task_description
        }
      }
      const option = {upsert: false}
      const result = await taskCollection.updateOne(query, updatedTask, option)
      res.send(result);
      
    })

    // status change in task
    app.patch('/task/status/:id', async(req,res)=>{
      const id = req.params.id;
      const {status} = req.body;
      const query = {_id: new ObjectId(id)};
      const updateStatus =  {
        $set: {
          status: status
        }
      }
      const result = await taskCollection.updateOne(query, updateStatus)

      res.send(result);

    })
    
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('TaskMinder Server is running..')
})

app.listen(port, () => {
  console.log(`TaskMinder server is running on port ${port}`)
})