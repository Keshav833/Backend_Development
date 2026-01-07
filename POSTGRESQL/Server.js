const {Client } = require('pg');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// database connection configuration
const con = new Client({
    host : "localhost",
    user : "postgres",
    port: 5432,
    password : "Kalu3112",
    database: "demopost"
})

// connecting to database
con.connect().then(()=>{
    console.log("Connected to postgreSql ");

})

// inserting data into the table
app.post('/postData', async (req, res)=>{

    try{

        const { name, id } = req.body;
        if(!name || !id ){
            return res.status(400).json({
                msg:"name and id are required",
            });
        }

        const insert_query = 'INSERT INTO demotable (name, id) VALUES ($1, $2)';

        await con.query(insert_query,[name, id]);

        res.status(201).json({
            msg: "Data inserted successfully",
        });
    }
    catch(err){

        console.error("Error inserting data:", err);
        res.status(500).json({
            msg: "Error inserting data",
        });
    }
});

// fetching all the data
app.get('/getData', async (req, res)=>{
    const fetch_query =' SELECT * FROM demotable';
    con.query(fetch_query,(err, result)=>{
        if(err){
            console.log("Error fetching data: ",err);
            res.send(err);
        }
        else{
            res.status(200).json({
                data : result.rows,
            })
        }
    })
})

// fetching the data by id
app.get('/getDataById/:id', async (req, res)=>{
    const {id} = req.params;
    const fetch_query = ' SELECT * FROM demotable WHERE id = $1 ';
    con.query(fetch_query,[id],(err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(

            
                result.rows[0],
            )
        }
    })
})

// updating the data by id
app.put('/updateData/:id', async (req, res)=>{
    const id  = req.params.id;
    const {name} = req.body;

    const update_query = 'UPDATE demotable SET name = $1 WHERE id = $2';

    con.query(update_query,[name, id], (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send("updated successfully");
        }
    })
})

// deleting the data by id
app.delete('/deleteData/:id', async (req,res)=>{
    const id = req.params.id;
    const delete_query = 'DELETE FROM demotable WHERE id = $1';

    con.query(delete_query,[id],(err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send("Deleted Successfully");
        }
    })
})
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})