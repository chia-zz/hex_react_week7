import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import CartDropdown from '../components/CartDropdown';

const NavbarData = {
  brand: {
    title: '植想嶼你',
    url: '/',
  },
  mainLinks: [
    { icon: 'bi-house-door', title: '首頁', url: '/' },
    { icon: 'bi-box-seam', title: '產品', url: '/product' },
    // { icon: 'bi-cart3', title: '購物車', url: '/cart' },
    { icon: 'bi-cash-stack', title: '結帳', url: '/checkout' },
    { icon: 'bi-person-gear', title: '後台', url: '/admin/login' },
  ],
};

function Header() {
  // mobile menu setting
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 點外面就關閉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className='front__header' ref={headerRef}>
        <nav className='navbar'>
          <div className='container'>
            {/* desktop */}
            <div className='header__container d-none d-lg-flex'>
              <NavLink
                className='header__brand fw-semibold text-decoration-none'
                to={NavbarData.brand.url}
              >
                {NavbarData.brand.title}
              </NavLink>

              <div className='home-nav'>
                <div className='home-container'>
                  {NavbarData.mainLinks.map((link) => (
                    <NavLink
                      key={link.url}
                      to={link.url}
                      className={({ isActive }) =>
                        `home-btn ${isActive ? 'home-btn--active' : ''}`
                      }
                      title={link.title}
                    >
                      <i className={`bi ${link.icon}`}></i>
                    </NavLink>
                  ))}
                  <svg
                    className='home-outline'
                    overflow='visible'
                    width='400'
                    height='48'
                    viewBox='0 0 400 48'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      className='home-rect'
                      pathLength='100'
                      x='0'
                      y='0'
                      width='400'
                      height='48'
                      fill='transparent'
                      strokeWidth='5'
                    />
                  </svg>
                </div>
              </div>
              <CartDropdown />
            </div>

            {/* mobile */}
            <div className='d-lg-none w-100'>
              <div
                className={`mobile-container ${
                  isMobileMenuOpen ? 'mobile-container--open' : ''
                }`}
              >
                <div className='mobile-container__header'>
                  <NavLink
                    className='header__brand  fw-semibold text-decoration-none'
                    to={NavbarData.brand.url}
                    onClick={closeMenu}
                  >
                    {NavbarData.brand.title}
                  </NavLink>

                  <div className='d-flex align-items-center gap-2'>
                    <button
                      type='button'
                      className='btn btn-outline-gray-400 rounded-pill border-none'
                      onClick={toggleMenu}
                    >
                      <i
                        className={`bi ${
                          isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                {/* dropdown*/}
                <div
                  className={`mobile-container__dropdown ${
                    isMobileMenuOpen ? 'mobile-container__dropdown--open' : ''
                  }`}
                >
                  <nav className='mobile-container__nav '>
                    {NavbarData.mainLinks.map((link) => (
                      <NavLink
                        key={link.url}
                        to={link.url}
                        className={({ isActive }) =>
                          `mobile-container__link ${
                            isActive ? 'mobile-container__link--active ' : ''
                          }`
                        }
                        onClick={closeMenu}
                      >
                        {link.title}
                      </NavLink>
                    ))}
                  </nav>

                  <div className='mobile-container__footer'>
                    <CartDropdown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* mobile 的遮罩 */}
      {/* 點背景就關閉選單 */}
      <div
        className={`mobile-overlay ${
          isMobileMenuOpen ? 'mobile-overlay--active' : ''
        }`}
        onClick={closeMenu}
      ></div>
    </>
  );
}
export default Header;
