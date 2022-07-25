import {NavLink} from 'react-router-dom';

function Card({catalog, id, price, title, img}) {
  return (
    <div 
      className={`card ${catalog ? 'catalog-item-card' : ''}`}
    >
      <img 
        src={img} 
        className='card-img-top img-fluid'
        alt={title}  
      />
      <div className='card-body'>
        <p className='card-text'>{title}</p>
        <p className='card-text'>{price} руб.</p>
        <NavLink 
          to={`/catalog/${id}`}
          className='btn btn-outline-primary'
        >Заказать</NavLink>
      </div>
    </div>
  );
}

export default Card;