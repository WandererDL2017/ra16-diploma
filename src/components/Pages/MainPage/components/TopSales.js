import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTopSales} from '../../../../utils/api';
import Preloader from '../../../Preloader';
import FetchError from '../../../FetchError';
import Card from '../../../Card';

function TopSales() {
  const {items, error, loading} = useSelector(store => store.topSales);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopSales());
  }, [dispatch])

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading && <Preloader />}
      {error && <FetchError request={() => {dispatch(getTopSales())}}/>}
      {
        !loading && !error && (
          <div className="row">
            {items.map(item => (
              <div className="col-4" key={item.id}>
                <Card id={item.id} title={item.title} price={item.price} img={item.images[0]}/>
              </div>
            ))}
         </div>
        )
      }
    </section>
  );
}

export default TopSales;