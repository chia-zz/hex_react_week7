// import { useState } from "react";
// import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import MessageToast from './components/MessageToast';

function App() {
  return (
    <>
      <MessageToast />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
