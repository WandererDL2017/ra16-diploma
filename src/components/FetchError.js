function FetchError({request, message = "Кажется что то пошло не так, попробуйте снова"}) {
  return (
    <div className='errorWrarpper'>
      <p className='errorMessage'>{message}</p>
      <button className='btn btn-outline-primary error' onClick={request}>Попробовать еще</button>
    </div>
  );
}
  
export default FetchError;