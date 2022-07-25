import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeActiveCategory} from '../../redux/Catalog/actionCreators';
import {getCategories} from '../../utils/api';
import FetchError from '../FetchError';

function CatalogFilter() {
  const {categories, active, loadingCategories} = useSelector(store => store.catalog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const changeCategory = (e, id) => {
    e.preventDefault();
    dispatch(changeActiveCategory(id));
  }

  return (
    <>
      { !loadingCategories && categories.length <= 1 && (
          <FetchError request={() => dispatch(getCategories())} />
      )}
      {
        !loadingCategories && categories.length > 1 && (
        <ul className="catalog-categories nav justify-content-center">
          {categories.map(category => (
            <li className="nav-item" key={category.id}>
              <a className={`nav-link ${category.id === active ? 'active' : ''}`} onClick={(e) =>changeCategory(e, category.id)} href='!#'>
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CatalogFilter;