import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {setSearch} from '../redux/Catalog/actionCreators';
import Logo from '../img/header-logo.png';

function Header() {
  const [isSearch, setIsSearch] = useState(false);
  const [querySearch, setQuerySearch] = useState('');

  const {cartItems} = useSelector(store => store.cart);
  const cartItemsCount = cartItems.reduce((acc, i) => {
    return acc += Number(i.count);
  }, 0)
  const dispatch = useDispatch();

  const history = useNavigate();
  const location = useLocation();
  const inputEl = useRef(null)

  const startSearch = () => {
    if (querySearch) {
      dispatch(setSearch(querySearch));
      history(`/catalog?${querySearch}`);
      setQuerySearch('');
      setIsSearch(false);
    } else {
      setIsSearch(prevState => !prevState);
    }
  }

  useEffect(()=> {
    if (isSearch) {
      inputEl.current.focus();
    }
  }, [isSearch])

  useEffect(()=> {
    setQuerySearch('');
    setIsSearch(false);
  }, [location.pathname])

  const searchItems = (e) => {
    e.preventDefault();
    startSearch();
  }

  const changeSearch = (e) => {
    setQuerySearch(e.target.value);
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
            <img src={Logo} alt="Bosa Noga" />
            </a>

            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink exact='true' to="/" className='nav-link' activeclassname="active">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/catalog" className='nav-link' activeclassname="active">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className='nav-link' activeclassname="active">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contacts" className='nav-link' activeclassname="active">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <button data-id="search-expander" className="header-controls-pic header-controls-search" onClick={startSearch}></button>
                  <button className="header-controls-pic header-controls-cart" onClick={() => {
                  history('/cart')}}>

                  {Boolean(cartItemsCount) && (
                  <div className="header-controls-cart-full">{cartItemsCount}</div>
                  )}
                  <div className="header-controls-cart-menu"></div>
                  </button>
                </div>
                <form data-id="search-form" className={`header-controls-search-form form-inline ${isSearch ? '': 'invisible'}`} onSubmit={searchItems}>
                  <input ref={inputEl} className="form-control" placeholder="Поиск"  value={querySearch} onChange={changeSearch}/>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;