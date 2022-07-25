import Banner from '../Banner';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {removeCartItems} from '../../redux/Cart/actionCreators';
import {sendOrder} from '../../utils/api';
import Preloader from '../Preloader';
import FetchError from '../FetchError';

function CartPage() {
  const { cartItems, loading, error, successOrder } = useSelector(store => store.cart);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({address: '', phone: '', access: false});

  const changeData = ({target}) => {
      const changedDate = (target.type === 'checkbox') ?
      {[target.name]: target.checked} :
       {[target.name]: target.value};
      setUserData(data => ({...data, ...changedDate}))
  }

  const submitData = (e) => {
      e.preventDefault();
      if (!userData.access) {
          return false;
      }
      const order = {
        owner: {
            phone: userData.phone,
            address: userData.address,
          },
          items: cartItems
      }
      dispatch(sendOrder(order))
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td><NavLink to={`/catalog/${item.id}`}>{item.title}</NavLink></td>
                    <td>{item.size}</td>
                    <td>{item.count}</td>
                    <td>{item.price} руб.</td>
                    <td>{item.price * item.count} руб.</td>
                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => {dispatch(removeCartItems({title: item.title, size: item.size}))}}>Удалить</button></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>
                    {cartItems
                    .reduce((acc, item) => {
                    return acc += item.price * item.count;
                    }, 0)} руб.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
              {loading && <Preloader />}
              {!loading && error && <FetchError request={() => {dispatch(sendOrder({
                owner: {
                  phone: userData.phone,
                  address: userData.address,
                },
                items: cartItems
              }))}}/>}

              {successOrder && (
                <div className='successWrarpper'>
                  Поздравляем, Ваш заказ успшено принят!!!<br/>
                  Что бы сформировать Ваш новый заказ, просто добавьте новый <NavLink to='/catalog'>товар</NavLink>
                </div>
              )}

              {!loading && !error && !successOrder && (
                <form className="card-body" onSubmit={submitData}>
                  <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input className="form-control" id="phone" name='phone' placeholder="Ваш телефон" value={userData.phone} onChange={changeData} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Адрес доставки</label>
                    <input className="form-control" id="address" name='address' placeholder="Адрес доставки" value={userData.address} onChange={changeData}/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" name='access' className="form-check-input" id="agreement" checked={userData.access} onChange={changeData}/>
                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                  </div>
                  <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default CartPage;