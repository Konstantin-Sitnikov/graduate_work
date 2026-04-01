
import  style  from "./style.module.scss"


const Header = ({setShowModal}) =>  {
    
  return (
    <header className={style.header}>
          <div className={style.header__container_logo}>
            <img className={style.header__logo} src={require("../../img/logo.png")} alt="Логотип" />
          </div>

          
          <div className={style.header__container_text}>
              <span className={style.header__number}>+7-8352-20-12-09. Telegram</span>
              <span className={style.header__text}>Электронная сервисная книжка "Мой силант"</span>
          </div>

          <div className={style.header__container_button}>
            <button className={style.header__button} onClick={()=>{setShowModal(true)}}>Авторизация</button>
          </div>

          
    </header>
  );
}


export default Header