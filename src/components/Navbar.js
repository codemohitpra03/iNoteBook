import React from 'react'
import {
    Link,
    useLocation
} from "react-router-dom";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }


  let location = useLocation();

  // useEffect(() => {
  //   // console.log(location.pathname);  
  // }, [location]);


  return (
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
            </li>
           
        </ul>
        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-2" to="/login" role="button"><i className="fa-solid fa-arrow-right-to-bracket"></i><span className='mx-2'>Login</span></Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button"><i className="fa-solid fa-user-plus"></i><span className='mx-2'>SignUp</span></Link>
        </form>: <button onClick={handleLogout} className='btn btn-primary mx-2'><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button> }
        </div>
    </div>
    </nav>
    
  )
}

export default Navbar