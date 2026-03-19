import { Link } from "react-router-dom";
function AdmNotFound404() {
  return (
    <>
      <div className="container my-5">
        <div className="text-primary-800 d-flex flex-column justify-content-center align-items-center">
          <h1 className="not-found-title">404</h1>
          <h3 className="fs-4 fs-lg-2 fw-bold text-primary-900">
            抱歉，頁面不存在。
          </h3>

          <div className="d-flex gap-3 my-3">
            <Link
              to="/admin/products"
              className="btn btn-accent rounded-pill px-4 py-2 "
            >
              回到後台首頁
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdmNotFound404;
