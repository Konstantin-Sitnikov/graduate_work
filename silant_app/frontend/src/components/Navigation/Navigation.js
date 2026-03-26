import { NavLink } from 'react-router-dom'
import  style  from "./style.module.scss"

export const NavigationMachine = () => {
    let active_link = style.navigation__link_active
    let link = style.navigation__link
    return  <nav className={style.navigation__mnachine}> 
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/">Машины</NavLink>
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/technical_maintenance">ТО</NavLink>
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/complaint">Рекламации</NavLink>
            </nav>
}
export const NavigationMachineDetail = () => {
    return  <nav> 
                <NavLink to="/">Машины</NavLink>
                <NavLink to="/detail/">ТО</NavLink>
                <NavLink to="/detail/complaint">Рекламации</NavLink>
            </nav>
}