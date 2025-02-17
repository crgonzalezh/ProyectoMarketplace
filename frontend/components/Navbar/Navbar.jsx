import React, {useContext} from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../Navbar/Navbar.css';

const Navbar = () => {
    const {token,logout} = useContext(UserContext);
    return(
        <div className='navbar'>
            <div className='nav'>
                <Link to="/nanomarket" className="navbar-title">Nanomarket.cl</Link>
                <Form className="d-flex flex-grow-1 mx-4">
                    <Form.Control
                        type="search"
                        placeholder="Buscar productos, marcas y mas..."
                        className="me-2 flex-grow-1"
                        aria-label="Search"
                    />
                    <Button variant="outline-light">
                        <i className="bi bi-search">🔍</i>
                    </Button>
                </Form>
                <Link to="/nanomarket/cart" className="me-3"><Button variant="outline-light">🛒</Button></Link>
                
                {token ? (
                        <>
                            <Link to="/nanomarket/bookmarks" className="me-3">
                                <Button variant="outline-light">🔖</Button>
                            </Link>
                            <Link to="/nanomarket/posts" className="me-3">
                                <Button variant="outline-light">📑</Button>
                            </Link>
                            
                            <Button variant="danger" onClick={logout}>Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/nanomarket/login" className="me-3"><Button variant="warning">Iniciar Sesión</Button></Link>
                            <Link to="/nanomarket/register"><Button variant="success">Registrarse</Button></Link>
                        </>
                    )}
            </div>
        </div>
    )
}
export default Navbar;