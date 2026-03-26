
import  style  from "./style.module.scss"


const Header = ({setShowModal}) =>  {
    
  return (
    <header className={style.header}>
        <div className={style.header__container}>
          <div className={style.header__container_logoNumberButton}>
              <img className={style.header__logo} src={require("../../img/Logo.jpg")} alt="Логотип" />
              <span className={style.header__number}>+7-8352-20-12-09. Telegram</span>
              <button className={style.header__button} onClick={()=>{setShowModal(true)}}>Авторизация</button>
          </div>
            
            <span className={style.header__text}>Электронная сервисная книжка "Мой силант"</span>
        </div>
        
        
    </header>
  );
}


export default Header