import { NavLink } from 'react-router-dom'
import  style  from "./style.module.scss"

export const NavigationMachine = () => {
    return  <nav className={style.navigation__mnachine}> 
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/">Машины</NavLink>
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/technical_maintenance">ТО</NavLink>
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/complaint">Рекламации</NavLink>
            </nav>
}
export const NavigationMachineDetail = () => {
    return  <nav className={style.navigation__mnachine}> 
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/">Машины</NavLink>
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/detail/technical_maintenance">ТО</NavLink>
                <NavLink className={({ isActive })=>{return isActive ? style.navigation__link_active :style.navigation__link}} to="/detail/complaint">Рекламации</NavLink>
            </nav>
}