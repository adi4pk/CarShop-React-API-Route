import Home from './pages/Home/Home'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import AddCar from './pages/AddCar/AddCar'
import EditCar from './pages/EditCar/EditCar'

function App() {

  return (
   
     <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-car' element={<AddCar/>}/>
        <Route path='/edit-car/:id' element={<EditCar/>}/>  {/* //props */}
      </Routes>

    </BrowserRouter>
  )
}

export default App
