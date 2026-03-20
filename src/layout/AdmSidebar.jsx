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
            <li key={item.url} className='mb-2'>
              <NavLink
                key={`/admin/${item.url}`}
                to={`/admin/${item.url}`}
                className={({ isActive }) =>
                  `sidebar_link ${isActive ? 'sidebar_link-active ' : ''}`
                }
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
