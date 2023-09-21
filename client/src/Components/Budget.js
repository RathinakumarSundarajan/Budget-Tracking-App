import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';
import "./Style.css";


const Budget = () => {
  // -------------------------------------------------------------POST DATA----------------------------------------------------------------------------------
    const [items, setItems] = useState();
    const [qty, setQty] = useState();
    const [prices, setPrices] = useState(0);

  // -----------------------------------------------------GETING DATA FROM DATABASE ----------------------------------------------------------------------------------
    const [budget,setBudget]=useState([])//-----for GETing Data it should be SQUERE BRACKET within Bracket----------
  // -----------------------------------------------------GETING DATABASE TOTAL AMOUNT----------------------------------------------------------------------------------  
    const [total,setTotal]=useState([])

    const navigate=useNavigate();

// --------------------------------------------------------------PAGINATON CONCEPT---------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 15;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = budget.slice(firstIndex, lastIndex);
    const npage = Math.ceil(budget.length/recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
// --------------------------------------------------------------SEARCH CONCEPT---------------------------------------------------------------
    // const [search, setSearch] = useState()

    // const Filter = (e) => {
    //   setSearch(records.filter(f=>f.items.toLowerCase().includes(e.target.value)))

    // }





// -------------------------------------------------------------------------POST BUDGET-----------------------------------------------------------------------------
    const postBudget =async()=>{
        // if (
        //     items === "" ||
        //     qty === "" ||  
        //     prices === "")
        // { 
        //    alert(" All Fields are Mandatory");
        // }
      // else {
        await axios.post("http://localhost:5700/postBudget",{items,qty,prices}); 
        alert("Submited Successfully.");
        // navigate('/GetBudget')
        window.location.reload();
          }
        // }

         

// ------------------------------------------------------------------------GET BUDGET--------------------------------------------------          
            const getBudget = async ()=>{
                const res = await axios.get("http://localhost:5700/getBudget"); 
                setBudget(res.data)
                // setSearch(res.data)
                console.log(res.data);
              }
              useEffect(()=>{
                getBudget();
              },[]);
// ------------------------------------------------------------------------GET TOTAL AMOUNT--------------------------------------------------          
const getTotalAmount = async ()=>{
  const res = await axios.get("http://localhost:5700/getTolalAmount"); 
  console.log(res)
  setTotal(res.data)
  // console.log(res.data);
}
useEffect(()=>{
  getTotalAmount();
},[]);
// ---------------------------------------------------------------Delete Data--------------------------------------------------------------
const deleteItems = async (id) => {
  try {
    await axios.delete('http://localhost:5700/deleteItems/'+id);
    alert("data Deleted Successfully")
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};




  return (
    <div class="background container-fluid card border border-primary text-white" style={{ backgroundColor: "#C45AEC" }}>
    <h3 class='d-flex justify-content-center pt-4'>THINK WISLEY BEFORE YOU SPENT </h3>
    <div class='d-flex justify-content-center pt-2'>
      <div class="row d-flex justify-content-center">
      <div class="col">
      <label>Enter Your Items</label>
      <input class='form-control border border-primary' type='text' onChange={(e)=>setItems(e.target.value)} required/>
      </div>
      <div class="col">
      <label>Enter The Quantity</label>
      <input type='number' class='form-control border border-primary' onChange={(e)=>setQty(e.target.value)} required/>
      </div>
      <div class="col">
      <label>Enter the Amount</label>
      <input type='number' class='form-control border border-primary' onChange={(e)=>setPrices(e.target.value)} required/>
      </div>
      <div class="col pt-4">
      <button  type="button" class="btn btn-danger btn-sm border-dark" onClick={postBudget}>Submit</button>
      </div> 
      <div class="col">
      <div class='card border border-primary text-center text-dark'>
    {total.map((data)=>(
        <div key={data.id} className='home'>
        <tr>
        <td><h4 class="col pt-4">Expenditure : {data.tot}</h4></td>       
        </tr>
        </div>
       ))} 
    </div>
    <div class="col">
      <label>Search</label>
      <input type='text' placeholder='Search...' class='form-control border border-primary'/>
      </div>
      </div>          
    </div>
    </div>
  
   
   <div class='d-flex justify-content-center pt-3'>  
   <h4>List of Items You Spent</h4>
   </div>



    <div class="pt-3 card border border-primary text-center container-fluid" style={{ backgroundColor: "#B1FFB2" }}> 
        <table class="table table-striped table-hover pt-4 text-center">          
            <tr class="align-center">
              <th>S.No</th>
              <th>Date</th>
              <th>Items</th>
              <th>Quantity(grm/kg/nos)</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>         
          <tbody>
        {records.map((data)=>(       
        <tr key={data.id}>
        <td>{data.userid}</td> 
        <td>{data.date}</td> 
        <td>{data.items}</td>
        <td>{data.quantity}</td>      
        <td>{data.prices}</td>
        {/* <td><button className='button'><Link to={`/Update/${data.userid}`}>Update</Link></button></td>  */}
        {/* <td><button className='button' onClick={()=>deleteItems(data.userid)}>Delete</button><FaBeer /></td> */}
        <td><svg xmlns="http://www.w3.org/2000/svg" onClick={()=>deleteItems(data.userid)} width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></td>
<td><Link to={`/Update/${data.userid}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></Link></td>
        </tr>       
       ))} 
       </tbody>
       </table>      
    </div>
{/* ---------------------------------------------------------------PAGINATION--------------------------------------------------------------- */}
    <div class='d-flex justify-content-end'>
    <nav class='pt-1 '  aria-label="Page navigation example">
      <ul class="pagination bg-primary">
        <li class="page-item">
          <a class="page-link text-dark" href='#' aria-label="Previous" onClick={prevPage}><span aria-hidden="true">&laquo;</span></a>
        </li>
      
        {numbers.map((n,i)=>(
          <li className={`page-items ${currentPage == n ? 'active' : ''}`}key={i}>
            <a class="page-link text-dark" href='#'onClick={()=>changeCPage(n)}>{n}</a>
          </li>
          ))}

          <li class="page-item">
          <a class="page-link text-dark" href='#' aria-label="Next" onClick={nextPage}><span aria-hidden="true">&raquo;</span></a>
         </li>
        </ul>
    </nav>
    </div>
{/* ---------------------------------------------------------------PAGINATION--------------------------------------------------------------- */}

{/* --------------------------------------------------------------PAGINATION---------------------------------------------------------------------------- */}
    </div>
  )

  function prevPage() {  
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
    }
  }

  function changeCPage(id) {   
    setCurrentPage(id)
  }

  function nextPage() {
    if(currentPage !== npage){
        setCurrentPage(currentPage + 1)
    }
  }

}

export default Budget






