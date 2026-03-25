import { NavLink } from 'react-router-dom';

const AdmLinks = [
  { title: '商品管理', url: '/products' },
  { title: '訂單管理', url: '/orders' },
  { title: '優惠券管理', url: '/coupons' },
];

function AdmSidebar() {
  return (
    <>
      <nav className='my-md-5'>
        <ul className='list-unstyled d-flex flex-md-column gap-2 mb-0'>
          {AdmLinks.map((item) => (
            <li key={item.url} className=''>
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
