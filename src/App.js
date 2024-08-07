import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'; 


import NavBarApp from './NavBar';
import HomeApp from './Home';
import GameOneApp from './GameOne';
import GameTwoApp from './GameTwo';
import TipsApp from './Tips';


const router = createBrowserRouter([
  {
    element: <NavBarApp />,
    children: [
      {
        path: "/",
        element: <HomeApp />,
      },
      {
        path: "/gameOne",
        element: <GameOneApp />
      }, 
      {
        path: "/gameTwo",
        element: <GameTwoApp />
      },
      {
        path: "/tips",
        element: <TipsApp />
      },
    ]
  }
])

//edit the classname of app if having problems with styling
//To-Do: uninstall HTML5 backend if it turns out we don't actually need it

//Helpful API calls: https://bolls.life/get-books/NLT/
//https://bolls.life/get-verse/NLT/44/1/1/

function App() {
  return (
    <div className="App"> 
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
