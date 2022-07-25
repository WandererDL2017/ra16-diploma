import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getItems} from '../../../../utils/api';
import Preloader from '../../../Preloader';
import FetchError from '../../../FetchError';
import CatalogFilter from '../../../Catalog/CatalogFilter';
import CatalogMoreBtn from '../../../Catalog/CatalogMoreButton';
import Card from '../../../Card';

function Catalog() {
  const {categories, items, active, error, loading, loadingCategories} = useSelector(store => store.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    if (active) {
      dispatch(getItems(active, signal));
    }
    return () => {
      controller.abort();
    }
  }, [active, dispatch])

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <CatalogFilter />
      {(loading || loadingCategories) && <Preloader />}
      {!(loading || loadingCategories) && error && categories.length > 1 && <FetchError request={() => {
        let controller = new AbortController();
        let signal = controller.signal;
        dispatch(getItems(active, signal))
      }} />}
      {!(loading || loadingCategories) && !error && categories.length > 1 && (
        <>
          <div className="row">
            {items.map(item => (
              <div className="col-4" key={item.id}>
                <Card catalog id={item.id} title={item.title} price={item.price} img={item.images[0]}/>
              </div>
            ))}
          </div>
          <CatalogMoreBtn />
        </>
      )}
    </section>
  );
}

export default Catalog;