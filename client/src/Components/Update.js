
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom';




    

const Update = () => {
    const {userid} = useParams();

    const [items, setItems] = useState();
    const [qty, setQty] = useState();
    const [prices, setPrices] = useState(0);


    const navigate = useNavigate();

    //--------------------------------------------------------------------------UPDATION---------------------------------------------------------------------------
    useEffect(()=>{
        // const UpdateData = async() =>{
             axios.get("http://localhost:5700/gettingforedit/"+userid) //----------GETTING FOR UPDATE----------------------------------------
            .then(res => {
                setItems(res.data[0].items);
                setQty(res.data[0].quantity);
                setPrices(res.data[0].prices);
            })
            .catch(err => console.log(err));
        // }
    },[])
        
    // const navigate = useNavigate();
        const updateBudget = () =>{
            axios.put("http://localhost:5700/updatedBudget/"+userid,{items,qty,prices}) //------PUT/POST UPDATED DATA----------------------------------------
            .then(res=>{
                if(res.data.data) {
                  alert('Updated Succefully')
                  navigate('/')
                }else {
                  alert('Not Updated')
                }          
            })
        }





  return (
    <div>
      <div class="row d-flex justify-content-center">
      <div class="col">
      <label>Enter Your Items</label>
      <input type='text' value={items} onChange={(e)=>setItems(e.target.value)}/>
      </div>
      <div class="col">
      <label>Enter The Quantity</label>
      <input type='number' value={qty} onChange={(e)=>setQty(e.target.value)}/>
      </div>
      <div class="col">
      <label>Enter the Amount</label>
      <input type='number' value={prices} onChange={(e)=>setPrices(e.target.value)}/>
      </div>
      <div class="col pt-4">
      <button  type="button" class="btn btn-secondary btn-sm"onClick={updateBudget}>Submit</button>
      </div> 
    </div>
    </div>
  )
}

export default Update
