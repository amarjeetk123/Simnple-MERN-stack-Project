
import './App.css';
import Form from './components/Form';
import UserList from './components/UserList';

// export const BASE_URL = "http://localhost:4000"; // for loacl use
export const BASE_URL = "https://crud-backend-vuvx.onrender.com";  // for deploying on vercal

function App() {
  
  return (
    <div>

      <Form />
      <UserList />
      
    </div>
  );
}

export default App;
