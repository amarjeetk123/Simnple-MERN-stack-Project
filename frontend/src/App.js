
import './App.css';
import Form from './components/Form';
import UserList from './components/UserList';

export const BASE_URL = "http://localhost:4000";

function App() {
  
  return (
    <div>

      <Form />
      <UserList />
      
    </div>
  );
}

export default App;
