import logo from "../../assets/images/logo.jpg";
import './NavBar.scss';

export default function NavBar() {
    return(
        <nav className="navbar">
            <img src={logo} alt="logo" className="navbar__logo"/>
            <h1 className="navbar__title">Code Tracker</h1>
        </nav>
    )
}