
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Search from "./pages/Search"
import Response from './pages/Response'


function App() {

  const route =createBrowserRouter([
    {
      path:'/',
      element:<Search/>,
    },
    {
      path:'/response',
      element:<Response/>,
    },
  ])
  

  return (
   <div>
    <RouterProvider router={route}></RouterProvider>
   </div>
  )
}

export default App
