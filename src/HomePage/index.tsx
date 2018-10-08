import * as React from "react";
import { connect } from "react-redux";
import { userdataActions } from "../_actions/userdata.actions";
import { getSortedUsers } from "../_selectors";
import {
  Dimmer,
  Divider,
  Header,
  Loader,
  List,
  Image
} from "semantic-ui-react";
import { history } from "../_helpers";
import "./HomePage.css";
import { userdata } from "../_reducers/userdata.reducer";
const logoImg = require("../assets/images/rh-svg.svg");
class ConnectedHomePage extends React.Component<any, any> {
  componentDidMount() {
    this.props.getLatest();
  }
  navToDetailPage(user) {
    history.push({
      pathname: `user/${user.id}`
    });
  }

  render() {
    const colNames = ["Name", "Username", "Email", "Address"];

    if (this.props.users === null) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    return (
      <div className="home-container">
        <div className="header-brand">
          <Image className="page-logo" src={logoImg} size="tiny" />
          <div className="page-title">Users</div>
        </div>
        <Divider />

        {this.props.favorites.length > 0 && (
          <div className="bookmarked-users">
            <div className="bookmarks-title">
              <p>Bookmarked users</p>
            </div>
            <List divided relaxed verticalAlign="bottom">
              {this.props.favorites.map((user, i) => (
                <List.Item>
                  <List.Icon name="user" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header
                      className="bookmark-link"
                      as="a"
                      onClick={() => history.push("/user/" + user.id)}
                    >
                      {user.name}
                    </List.Header>
                    <List.Description as="a">{user.username}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        )}
        <Divider />

        <div className="custom-table">
          <div className="header-row">
            {/* {Object.keys(this.props.users[0]).map((colName, i) => ( */}
            {colNames.map((colName, i) => (
              <div className={"header-col-" + colName} key={i}>
                {colName}
              </div>
            ))}
          </div>
          {this.props.users.map((user, i) => (
            <div className="data-row" key={i}>
              <div className="data-col">
                <div
                  className="username-nav"
                  onClick={() => this.navToDetailPage(user)}
                >
                  <p className="username-text">{user.name}</p>
                </div>
              </div>
              <div className="data-col">{user.username}</div>
              <div className="data-col email">{user.email}</div>
              <div className="data-col address">
                <div className="address-text">
                  <p>{user.address.street}</p>
                  <p>
                    {user.address.city}{" "}
                    {user.address.state && <span>, {user.address.state}</span>}
                  </p>

                  <p>{user.address.zipcode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLatest: () => {
      dispatch(userdataActions.getLatest());
    },
    setSortFilter: filter => {
      dispatch(userdataActions.setSortFilter(filter));
    }
  };
}

function mapStateToProps(state) {
  return {
    users: getSortedUsers(state),
    favorites: state.userdata.favorites
  };
}
const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHomePage);
export default HomePage;
