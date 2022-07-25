import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/store'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import MainPage from './components/Pages/MainPage/MainPage'
import CatalogPage from './components/Pages/CatalogPage.js'
import AboutPage from './components/Pages/AboutPage.js'
import ContactsPage from './components/Pages/ContactsPage.js'
import NotFoundPage from './components/Pages/NotFoundPage.js'
import ProductPage from './components/Pages/ProductPage.js'
import CartPage from './components/Pages/CartPage.js'



function App() {
  

  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Header />
          <Routes>
            <Route exact path='/*' element={<MainPage />} />
            <Route path='/catalog/:id' element={<ProductPage />} />
            <Route path='/catalog' element={<CatalogPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contacts' element={<ContactsPage />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        <Footer />
      </Router>
    </div>
    </Provider>
  );
}

export default App;