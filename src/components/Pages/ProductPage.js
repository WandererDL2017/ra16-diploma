import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {changeSizeItem, changeCountItem} from '../../redux/Product/actionCreators';
import {setCartItems} from '../../redux/Cart/actionCreators';
import {getItem} from '../../utils/api';
import Banner from '../Banner';
import Preloader from '../Preloader';
import FetchError from '../FetchError';


function ProductPage() {
    const history = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {item, size, count, error, loading} = useSelector(store => store.product);
   
    useEffect(() => {
        dispatch(getItem(id))
    }, [dispatch, id])

    const saveProduct = () => {
        dispatch(setCartItems({id: Number(id), count: count, size: size, price: item.price, title: item.title}));     
        history('/cart');
    }

  return (
    <main className="container">
        <div className="row">
            <div className="col">
                <Banner />
                <section className="catalog-item">

                {loading && <Preloader />}
                {error && <FetchError request={() => dispatch(getItem(id))} />}
                
                {!loading && !error && (
                  <>
                    <h2 className="text-center">{item.title}</h2>
                    <div className="row">
                      <div className="col-5">
                        <img  src={item.images[0]}
                              className="img-fluid" 
                              alt="" 
                        />
                      </div>
                      <div className="col-7">
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td>Артикул</td>
                              <td>{item.sku}</td>
                            </tr>
                            <tr>
                              <td>Производитель</td>
                              <td>{item.manufacturer}</td>
                            </tr>
                            <tr>
                              <td>Цвет</td>
                              <td>{item.color}</td>
                            </tr>
                            <tr>
                              <td>Материалы</td>
                              <td>{item.material}</td>
                            </tr>
                            <tr>
                              <td>Сезон</td>
                              <td>{item.season}</td>
                            </tr>
                            <tr>
                              <td>Повод</td>
                              <td>{item.reason}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center">
                          <p>Размеры в наличии:
                            {item.sizes
                              .filter(sizeFilter => sizeFilter.avalible)
                              .map((sizeMap, idx) => (
                                  <span className={`catalog-item-size ${(sizeMap.size === size) ? 'selected' : ''}`} key={idx}
                                  onClick={() => dispatch(changeSizeItem(sizeMap.size))}>{sizeMap.size}</span>
                              ))}
                          </p>
                          <p>Количество: 
                            <span className="btn-group btn-group-sm pl-2">
                              <button disabled={count <= 0} className="btn btn-secondary" onClick={() => dispatch(changeCountItem(-1))}>-</button>
                              <span className="btn btn-outline-primary">{count}</span>
                              <button disabled={count >= 10} className="btn btn-secondary" onClick={() => dispatch(changeCountItem(1))}>+</button>
                            </span>
                          </p>
                        </div>
                        <button disabled={!count || !size} className="btn btn-danger btn-block btn-lg" 
                          onClick={saveProduct}>В корзину</button>
                      </div>
                    </div>
                  </>
                )}
              </section>
            </div>
        </div>
    </main>
  );
}

export default ProductPage;