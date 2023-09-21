
import React, { useState, useEffect } from 'react'
import axios from 'axios'



const GetBudget = () => {
    const [budget,setBudget]=useState([])   //-----for GETing Data it should be SQUERE BRACKET within Bracket----------

    const getBudget = async ()=>{
        const res = await axios.get("http://localhost:5700/getBudget"); 
        setBudget(res.data)
        console.log(res.data);
      }
      useEffect(()=>{
        getBudget();
      },[]);




  return (
    <div>
        <h1>gettin data</h1>  
           
      
    {budget.map((data)=>(
        <div key={data.id} className='home'>
        <tr>
        <td>{data.userid}</td> 
        <td>{data.items}</td>     
        <td>{data.prices}</td>
        {/* <td><button className='button'><Link to={`/Update/${data.userid}`}>Update</Link></button></td> 
        <td><button className='button' onClick={()=>deleteData(data.userid)}>Delete</button></td>  */}

        </tr>
        </div>
       ))} 
      
    </div>
  )
}

export default GetBudget
