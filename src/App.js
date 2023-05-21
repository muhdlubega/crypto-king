import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import React from 'react';

const LazyHomePage = lazy(() => import("./pages/HomePage"));
const LazyCoinsPage = lazy(() => import("./pages/CoinsPage"));

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading</div>}><LazyHomePage /></Suspense>}></Route>
          <Route path="/coins/:id" element={<Suspense fallback={<div>Loading</div>}><LazyCoinsPage /></Suspense>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
