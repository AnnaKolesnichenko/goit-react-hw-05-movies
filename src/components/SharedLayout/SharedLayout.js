import { Link, Outlet } from 'react-router-dom';
import style from './Shared.module.css';

const SharedLayout = () => {
  return (
    <div>
      <nav className={style.shared}>
        <Link to="/" className={style.shared_link}>
          Home
        </Link>
        <Link to="/movies" className={style.shared_link}>Movies</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
