import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Budget from './Components/Budget'
import GetBudget from './Components/GetBudget'
import Update from './Components/Update'
import Pagination from './Components/Pagination'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Budget/>}/>
        <Route exact path='/Update/:userid' element={<Update/>}/>
        {/* <Route path='/GetBudget' element={<GetBudget/>}/>     */}
      </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
