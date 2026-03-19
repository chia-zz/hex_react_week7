import { Link } from "react-router-dom";
function NotFound404() {
  return (
    <>
      <div className="text-primary-800 not-found">
        <div className="liquid-glass">
          <h1 className="not-found-title">404</h1>
          <h3 className="fs-4 fs-lg-2 fw-bold text-primary-900">
            抱歉，這片葉脈 似乎還未被光影觸及。
          </h3>
          <p className="text-primary-900">
            這座島嶼比想像中大了一些，
            <br />
            在您尋找的角落裡，目前只有微光與靜謐。
            <br />
            不如先回歸最初的岸邊，重新開始這場探索？
          </p>
          <div className="d-flex gap-3 my-3">
            <Link to="/" className="btn btn-accent rounded-pill px-4 py-2 ">
              回到首頁
            </Link>

            <Link
              to="/product"
              className="btn btn-accent rounded-pill px-4 py-2"
            >
              逛逛商品
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default NotFound404;
