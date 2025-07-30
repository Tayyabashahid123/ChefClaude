import './header.css'
import chef from '../chef.png'

export default function Header(){
    return <header>
        <img src={chef} alt="chef"/>
        <h2> Chef Claude</h2>
    </header>
}