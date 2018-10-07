import * as React from "react";
import { connect } from "react-redux";
import { userdataActions } from "../_actions/userdata.actions";
import { getSortedUsers } from "../_selectors";
import { Dimmer, Header, Loader } from "semantic-ui-react";
import { history } from "../_helpers";

// import zipcodes from "zipcodes";
import "./HomePage.css";
class ConnectedHomePage extends React.Component<any, any> {
  state = {
    columnNames: null
  };
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
        <div className="page-title">Redhat Users </div>
        <div className="custom-table">
          <div className="header-row">
            {/* {Object.keys(this.props.users[0]).map((colName, i) => ( */}
            {colNames.map((colName, i) => (
              <div className="header-col" key={i}>
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
              <div className="data-col">{user.email}</div>
              <div className="data-col">
                <div className="address-container">
                  <p>{user.address.street}</p>
                  <p>{user.address.city}</p>
                  <p>{user.address.zipcode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row" />
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
    users: getSortedUsers(state)
  };
}
const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHomePage);
export default HomePage;
