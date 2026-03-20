import { NavLink } from 'react-router-dom';

const AdmLinks = [
  { title: '訂單管理', url: '/orders' },
  { title: '商品管理', url: '/products' },
  { title: '圖片管理', url: '/images' },
];

function AdmSidebar() {
  return (
    <>
      <nav className='my-4'>
        <ul className='list-unstyled'>
          {AdmLinks.map((item) => (
            <li key={item.url}>
              <NavLink
                key={`/admin/${item.url}`}
                to={`/admin/${item.url}`}
                // className={({ isActive }) =>
                //   `mobile-container__link ${
                //     isActive ? 'mobile-container__link--active ' : ''
                //   }`
                // }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
export default AdmSidebar;
