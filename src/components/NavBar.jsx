import { Link } from 'react-router-dom'

const NavBar = () => {
    return <header>
        <h1>NC News</h1>
        <nav>
            <Link to='/'> Home </Link>
            <Link to='/articles'> Articles </Link>
        </nav>
    </header>
}

export default NavBar