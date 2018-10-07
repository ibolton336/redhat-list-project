import * as React from "react";
import { connect } from "react-redux";
import { userdataActions } from "../_actions/userdata.actions";
import { getSortedUsers } from "../_selectors";
import { Dimmer, Header, Loader } from "semantic-ui-react";
import "./HomePage.css";

class ConnectedHomePage extends React.Component<any, any> {
  componentDidMount() {
    this.props.getLatest();
  }
  navToDetailPage(i) {}
  render() {
    if (this.props.users === null) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    return (
      <div className="home-container">
        <Header as="h2">Redhat Users </Header>
        <div className="row">
          {this.props.users.map((user, i) => (
            <div key={i} onClick={() => this.navToDetailPage(i)}>
              <p className="nav-text">{user.name}</p>
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
