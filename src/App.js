import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import './App.scss';
import { AuthProvider } from './firebase/AuthContext';
import { FirestoreProvider } from './firebase/DBcontext';

function App() {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <Dashboard />
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
