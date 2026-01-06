import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

const connectionClient = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "curagres",
  database: "pgpractice",
})

connectionClient.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Connection error", err.stack);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the User API",
  }).status(200);
});


app.post('/postData', async (req, res) => {
  const { name } = req.body;

  const insertQuery = 'INSERT INTO practiceone (name) VALUES ($1) RETURNING *';

  connectionClient.query(insertQuery, [name],(err, result) => {
    if (err) {
      console.error('Error inserting data', err.stack);
      return res.status(500).json({ error: 'Failed to insert data' });
    }
    console.log(result.rows[0]);
    
    res.status(201).json({ message: 'Data inserted successfully' ,result: result.rows[0]});
  });
})


app.get('/getData', async (req, res) => {
  const selectQuery = 'SELECT * FROM practiceone';
  connectionClient.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error fetching data', err.stack);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.status(200).json({ data: result.rows });
  });
});

app.get('/getData/:id', async (req, res) => {
  const { id } = req.params;
  const selectQuery = 'SELECT * FROM practiceone WHERE id = $1';
  connectionClient.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data', err.stack);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    if(result.rows.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ data: result.rows });
  });
});

app.put('/updateData/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateQuery = 'UPDATE practiceone SET name = $1 WHERE id = $2 RETURNING *';
  connectionClient.query(updateQuery, [name, id], (err, result) => {
    if (err) {
      console.error('Error updating data', err.stack);
      return res.status(500).json({ error: 'Failed to update data' });
    }
    if(result.rows.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data updated successfully', data: result.rows[0] });
  });
});

app.delete('/deleteData/:id', async (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM practiceone WHERE id = $1 RETURNING *';
  connectionClient.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data', err.stack);
      return res.status(500).json({ error: 'Failed to delete data' });
    }
    if(result.rows.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: result.rows[0] });
  });
});

app.delete('/deleteAllData', async (req, res) => {
  const deleteQuery = 'DELETE FROM practiceone';
  connectionClient.query(deleteQuery, (err, result) => {
    if (err) {
      console.error('Error deleting all data', err.stack);
      return res.status(500).json({ error: 'Failed to delete all data' });
    }
    res.status(200).json({ message: 'All data deleted successfully' });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});