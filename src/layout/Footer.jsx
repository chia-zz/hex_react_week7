import { NavLink } from "react-router-dom";

const FooterData = {
  brand: {
    name: "植想嶼你",
    slogan: [
      "將自然的光影帶入城市生活，打造專屬的綠色棲所",
      "為每一位在生活中奔波的靈魂",
      "打造專屬的綠色棲所",
    ],
  },

  explore: {
    title: "探索",
    links: [
      { title: "關於我們", url: "/" },
      { title: "植物照護誌", url: "/" },
      { title: "配送說明", url: "/" },
      { title: "退換貨政策", url: "/" },
    ],
  },
  contact: {
    title: "聯絡我們",
    email: "service@island-with-you.com",
    socialMedia: [
      {
        name: "Email",
        icon: "bi-envelope",
        url: "mailto:service@island-with-you.com",
      },
      { name: "Facebook", icon: "bi-facebook", url: "https://facebook.com" },
      { name: "Instagram", icon: "bi-instagram", url: "https://instagram.com" },
    ],
  },
};
const FooterBrand = ({ brand }) => {
  return (
    <div className="text-start">
      <NavLink className="nav-link mb-4" to="/">
        <div className="fs-3 display-md-3">{brand.name}</div>
      </NavLink>
      <div>
        {brand.slogan.map((line, index) => (
          <p key={index} className="mb-2">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

function Footer() {
  return (
    <footer className="container-fluid text-primary-700 fw-medium">
      <div className="container py-4">
        <div className="row g-6 mb-7 mb-md-8 d-flex">
          {/* brand + social media 區 */}
          <div className="col-md-4">
            <FooterBrand
              brand={FooterData.brand}
              socialMedia={FooterData.socialMedia}
            />
          </div>
          {/* 探索區 */}
          <div className="col-md-4 text-start text-md-center">
            <div className="row">
              <h4 className="fs-3 mt-3 mb-3 mb-md-4">
                {FooterData.explore.title}
              </h4>{" "}
              <ul className="list-unstyled">
                {FooterData.explore.links.map((link, index) => (
                  <li className="fs-6 fw-medium mb-3 mb-md-4" key={index}>
                    <NavLink className="nav-link" to={link.url}>
                      <div className="">{link.title}</div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 聯絡我們 */}
          <div className="col-md-4 text-start text-md-center">
            <h4 className="fs-3 mt-3 mb-3 mb-md-4">
              {FooterData.contact.title}
            </h4>
            <ul className="list-unstyled d-flex justify-content-md-center gap-3">
              {FooterData.contact.socialMedia.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    className="text-primary-700"
                    title={item.name}
                  >
                    <i
                      className={`bi ${item.icon}`}
                      style={{ fontSize: "32px" }}
                    ></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center pb-6 d-flex justify-content-md-center align-items-center"></div>
        <p className="mb-1" style={{ fontSize: "14px" }}>
          當月光沉入葉脈，我們在島嶼相見。
        </p>
        <p>
          <i className="bi bi-c-circle me-1 fs-md"></i>2026 植想嶼你 All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
