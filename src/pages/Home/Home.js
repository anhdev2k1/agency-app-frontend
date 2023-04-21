import "./home.scss";
import video from "../../assets/images/video.mp4";
import bg1 from "../../assets/images/home-bg5.png";
import bg2 from "../../assets/images/home-bg1.png";
import bg3 from "../../assets/images/home-bg3.png";
import { Link } from "react-router-dom";
import Dragula from "react-dragula";
const Home = () => {
  return (
    <>
      <div className="background">
        <div className="container">
          <div className="navbar__home">
            <h1 className="navbar__logo">LOGO.</h1>
            <div className="navbar__list-btn">
              <Link
                to="/register"
                style={{ color: "white", backgroundColor: "#333" }}
                className="navbar__btn-item"
              >
                Đăng ký
              </Link>
              <Link
                to="/login"
                className="navbar__btn-item"
                style={{ color: "#333", marginLeft: "20px" }}
              >
                Đăng nhập
              </Link>
            </div>
          </div>
          <div className="header">
            <div className="circle__header"></div>
            <div className="header__title">
              <h2>Trở thành một nhà bán hàng xuất sắc !!</h2>
              <p className="header__title-desc">
                Bạn đang có nguồn hàng, sản phẩm. Nhưng bạn không có nơi nào để
                bán chúng. Hãy đến với chúng tôi ngay bây giờ. Chúng tôi cung
                cấp cho bạn một gian hàng riêng. Ở đây bạn có thể thiết kế cửa
                hàng của riêng mình và bán sản phẩm của mình trên trang web của
                chúng tôi nền tảng thương mại với hơn 5000+ người bán khác.
              </p>
              <Link
                to="/explore"
                style={{ color: "black" }}
                className="header__btn"
              >
                Bắt đầu thôi!
              </Link>
            </div>
            <div className="header__video">
              <video width="620" autoPlay="autoplay" loop muted>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="custom-shape-divider-bottom-1678628010">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="custom-shape-divider-top-1678628517">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="content">
            <div className="content__box dragthing">
              <h3>what do we have?</h3>
              <div className="content__flex">
                <img src={bg1} alt="" />
                <div className="circle__positon"></div>
                <div className="content__desc">
                  <p>
                    Với sự thoải mái của khách hàng. Nói chung, chúng tôi cung
                    cấp khả năng tạo thương hiệu cá nhân ngay trên website với
                    lợi thế sáng tạo, thu hút khách hàng. Hỗ trợ marketing sản
                    phẩm và đưa sản phẩm lên trending mà không cần người dùng
                    phải biết đến marketing
                  </p>
                </div>
              </div>
            </div>

            <div className="content__box dragthing">
              <h3>benefits bring</h3>
              <div
                className="content__flex"
                style={{ flexDirection: "row-reverse" }}
              >
                <img src={bg2} alt="" />
                <div
                  className="circle__positon"
                  style={{ top: "40px", left: "-40px" }}
                ></div>
                <div className="content__desc">
                  <p>
                    Công việc của bạn là tạo ra cửa hàng cá nhân của riêng bạn.
                    Hãy để chúng tôi lấy chăm sóc phần còn lại. Bạn chỉ cần quản
                    lý nguồn hàng hóa trên hóa đơn và nhận nó một cách dễ dàng
                    hơn. Lorem ipsum dolor, sit amet consectetur adipisicing
                    elit. Id vel eum illo nobis dolore fugit excepturi, non
                    facere dolorum, dignissimos in enim dolorem quis esse
                    similique. Aspernatur ipsam expedita architecto.
                  </p>
                </div>
              </div>
            </div>
            <div className="content__box dragthing">
              <h3>Quick support</h3>
              <div className="content__flex">
                <img src={bg3} alt="" />
                <div className="circle__positon"></div>
                <div className="content__desc">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Excepturi, aut et, mollitia dolorem repellat harum neque
                    repudiandae tenetur, nesciunt suscipit dicta sapiente? Optio
                    animi eaque nam explicabo non, aliquid deserunt
                    <br />
                    .Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Perspiciatis accusantium aliquid amet accusamus, alias
                    facilis voluptas aut nulla ab aspernatur, perferendis
                    maxime, cumque odio unde beatae sapiente? Itaque, sapiente
                    ea.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="footer__container"></footer>
        </div>
      </div>
    </>
  );
};

export default Home;
