require('dotenv').config(); 


const express = require('express');
const cors = require('cors');
const db = require('./model/connect_db');
var bodyParser = require('body-parser')

const PORT=(process.env.PORT)





const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())


// ------------------------------------------------------------POSTING--------------------------------------------------------------
app.post('/postBudget',function(req,res){
    const items = req.body.items;
    const qty = req.body.qty;
    const prices = req.body.prices;

    const sql = 'INSERT INTO budget_tb (items,quantity,prices) VALUES ?'; 

    const xyz = [[items,qty,prices]];

    db.query(sql,[xyz],(error,result)=>{
        if(error) return res.json(error);
        // console.log(result)
        // return res.json(result)
        res.json({"status":"success","message":"Record sent successfully","data":""});
    });
});
// -----------------------------------------------------------POSTING/SENDING COMPLETED--------------------------------------------------------------
// -----------------------------------------------------------GETTING ALL DATA------------------------------------------------------------------------
app.get('/getBudget',function(req,res){  
    const sql = 'SELECT * FROM budget_tb';   
    db.query(sql,(error,result)=>{
        if(error) return res.json(error);
        // console.log(result)
         res.json(result);
    });
});
// -----------------------------------------------------------GETTING ALL DATA COMPLETED------------------------------------------------------------------------
// -----------------------------------------------------------TOTAL AMOUNT SPENT------------------------------------------------------------------------
app.get('/getTolalAmount',function(req,res){  
    const sql = 'SELECT SUM (prices) as tot FROM budget_tb';   
    db.query(sql,(error,result)=>{
        if(error) return res.json(error);
        // console.log(result)
         res.json(result);
    });
});
// ------------------------------------------------------------------DELETION--------------------------------------------------------------
app.delete('/deleteItems/:id',(req,res)=>{
    const q = "DELETE FROM budget_tb WHERE userid = ?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Item Deleted successfully");
    })
})
// ------------------------------------------------------------------DELETIONCOMPLETED--------------------------------------------------------------
// -------------------------------------------------------------------UPDATION---------------------------------------------------------------------------
app.get('/gettingforedit/:id',function(req,res){  
    const sql = 'SELECT * FROM budget_tb WHERE userid = ?';   
    db.query(sql,[req.params.id],(error,result)=>{
        if(error) return res.json(error);
        console.log(result)
        return res.json(result);
    });
});
app.put('/updatedBudget/:id',function(req,res){  
    const sql = 'UPDATE budget_tb SET items=?, quantity=?, prices=? WHERE userid = ?';   
    db.query(sql,[req.body.items,req.body.qty,req.body.prices,req.params.id],(error,result)=>{
        if(error) return res.json(error);
        console.log(result)
        return res.json({data:true});
    });
});
// ----------------------------------------------------------------UPDATION COMPLETED--------------------------------------------------------------


// -----------------------------------------------------------CONNECTED PORT NUMBER------------------------------------------------------------------------
app.listen(PORT,()=>{
    console.log(`backend runing on port ${PORT}`)
})