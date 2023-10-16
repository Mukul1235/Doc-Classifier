import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
  return (
    <div>
      <nav>
        <ul className="arrange">
          <li>
            <Link to="/" id='icon'>Peaky Balwinders</Link>
          </li>
          <li>
            <Link className="blogs" to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link className="contact" to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
};

export default Layout;
