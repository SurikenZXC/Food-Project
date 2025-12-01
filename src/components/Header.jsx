import logo from "../assets/logo.svg"
import editLogo from "../assets/edit.svg"
import searchLogo from "../assets/search.svg"
import addLogo from "../assets/add.svg"
import NavButton from "./NavButton";

function Header() {
    return (
        <header>
            <img className="header-logo" src={logo} alt="logo"/>
            <nav>
                <NavButton imgSrc={addLogo} />
                <NavButton imgSrc={editLogo} />
                <NavButton imgSrc={searchLogo} />
            </nav>
        </header>
    )
}

export default Header;