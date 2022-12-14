import style from './Loader.module.css'

const Loader = () => {
    return (
      <div
        className={
          style.loaderWrapper + ' ' + Loader.centeredContent
        }>
        <div className={style.loader}>
          <img
            src={require('./cat.gif')}
            width='350'
            alt='loader...'
            style={{ borderRadius: '50%' }}
          />
        </div>
      </div>
    );
  };
  
export default Loader;