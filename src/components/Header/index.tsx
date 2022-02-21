import "./style.css";
import { HeaderBtn } from "./components/HeaderBtn";
import { connect } from "react-redux";
import {
  AppDispatch,
  AppState,
  getComparedHotels,
  getComparedHotelsMainData,
} from "../../store";
import { getUserData } from "../../store/users/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface StateProps {
  user: any;
  hotelsForCompare: number[];
  compareHotelData: any;
}
interface DispatchProps {
  getUserData: () => Promise<void>;
  getComparedHotels: (ids: number[]) => Promise<void>;
  getComparedHotelsMainData: (hotel: any) => Promise<void>;
}

type HeaderProps = StateProps & DispatchProps;

const Header: React.FC<HeaderProps> = (props) => {
  const {
    user,
    getUserData: getData,
    hotelsForCompare,
    compareHotelData,
    getComparedHotels,
    getComparedHotelsMainData,
  } = props;
  useEffect(() => {
    getData();
  }, [getData]);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="header">
      <div className="container">
        <Link className="header-logo" to="/">
          <div className="logo-img"></div>
          <h1 className="logo-text">SkyHotel</h1>
        </Link>
        <div className="heaber-btns">
          <HeaderBtn data={props.user} />
          <div
            className={`compare-btn  ${!modalShow ? "" : "close-modal"}`}
            onClick={(e) => {
              if ((e.target as HTMLElement).classList.contains("compare-icon"))
                setModalShow(!modalShow);
            }}
          >
            <div className="compare-icon"></div>
            <div className={`compare-modal ${modalShow ? "" : "hidden"}`}>
              {compareHotelData.length ? (
                compareHotelData.map((hotel: any) => (
                  <div className="compare-modal-hotel">
                    <div
                      className="compare-modal-img"
                      style={{
                        backgroundImage: `url(${hotel.img})`,
                      }}
                    ></div>
                    <span className="compare-modal-text">{hotel.hotel}</span>
                  </div>
                ))
              ) : (
                <span className="compare-modal-no-text">
                  Вы не выбрали отели для сравнения
                </span>
              )}
              {compareHotelData.length === 2 ? (
                <Link to="/compare-hotels" className="compare-modal-btn">
                  Перейти к сравнению
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.usersData.user,
  hotelsForCompare: state.compareHotelsData.hotelsForCompare,
  compareHotelData: state.compareHotelsData.compareHotelData,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getUserData: () => dispatch(getUserData()),
  getComparedHotels: (ids) => dispatch(getComparedHotels(ids)),
  getComparedHotelsMainData: (hotel) =>
    dispatch(getComparedHotelsMainData(hotel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
