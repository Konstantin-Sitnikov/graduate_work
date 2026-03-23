import { NavLink } from 'react-router-dom'

export const NavigationMachine = () => {
    return  <nav> 
                <NavLink to="/">Машины</NavLink>
                <NavLink to="/technical_maintenance">ТО</NavLink>
                <NavLink to="/complaint">Рекламации</NavLink>
            </nav>
}
export const NavigationMachineDetail = () => {
    return  <nav> 
                <NavLink to="/">Машины</NavLink>
                <NavLink to="/detail/">ТО</NavLink>
                <NavLink to="/detail/complaint">Рекламации</NavLink>
            </nav>
}