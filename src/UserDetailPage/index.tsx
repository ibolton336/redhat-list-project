import { userdataActions } from "../_actions/userdata.actions";
import * as React from "react";
import {
  Breadcrumb,
  Dimmer,
  Loader,
  Card,
  Icon,
  Image,
  Button,
  List
} from "semantic-ui-react";
import { history } from "../_helpers";
import { connect } from "react-redux";
import { getSortedUsers } from "../_selectors";
import { UserDetailCard } from "../_components/UserDetailCard";
import "./UserDetailPage.css";
const logoImg = require("../assets/images/rh-svg.svg");

interface IUserDetailPageProps {
  match: any;
  userData: any;
  getLatest: any;
  users: any;
  toggleFavorite: any;
  setFavorites: any;
}

export class ConnectedUserDetailPage extends React.Component<
  IUserDetailPageProps,
  any
> {
  renderUserDetailCard() {
    const { userData, match, setFavorites } = this.props;
    const activeUser = userData.users.filter(
      (user, i) => user.id === parseInt(match.params.id, 10)
    );
    const user = activeUser[0];
    const isFavorite =
      userData.favorites.findIndex(favorite => favorite.id === user.id) > -1;
    return (
      <UserDetailCard
        isFavorite={isFavorite}
        favorites={userData.favorites}
        user={activeUser}
        setFavorites={setFavorites}
      />
    );
  }

  render() {
    const { userData } = this.props;
    return (
      <div className="user-detail-container">
        <div className="header-brand">
          <Image className="page-logo" src={logoImg} size="tiny" />
          <div className="user-detail-page-title">User Detail</div>
        </div>

        <Breadcrumb className="breadcrumb-container">
          <Breadcrumb.Section onClick={() => history.push("/")}>
            User List
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>
            {this.props.match.params.id
              ? this.props.match.params.id
              : "No User Found"}
          </Breadcrumb.Section>
        </Breadcrumb>
        {userData.users ? this.renderUserDetailCard() : <h2>list is empty</h2>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: getSortedUsers(state),
    userData: state.userdata
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getLatest: () => {
      dispatch(userdataActions.getLatest());
    },
    setFavorites: favorites => {
      dispatch(userdataActions.setFavorites(favorites));
    }
  };
}

const UserDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedUserDetailPage);
export default UserDetailPage;
