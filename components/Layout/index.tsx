import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main>{children}</main>
      <Footer />
    </>
  );
}
