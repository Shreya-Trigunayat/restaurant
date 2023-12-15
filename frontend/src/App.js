import './App.css';
import Header from './component/Header';
import {Outlet} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster />
      <div>
      <Header/>
      <main className='pt-16 bg-slate-100'>
        <Outlet/>
      </main>
      </div>
    </>
  );
}

export default App;
