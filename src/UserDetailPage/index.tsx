import { userdataActions } from "../_actions/userdata.actions";
import * as React from "react";
import {
  Breadcrumb,
  Dimmer,
  Loader,
  Card,
  Icon,
  Image
} from "semantic-ui-react";
import { history } from "../_helpers";
import { connect } from "react-redux";
import { getSortedUsers } from "../_selectors";

import "./UserDetailPage.css";

interface IUserDetailPageProps {
  match: any;
  userData: any;
  getLatest: any;
  users: any;
}

export class ConnectedUserDetailPage extends React.Component<
  IUserDetailPageProps,
  any
> {
  componentDidMount() {
    this.props.getLatest();
  }

  onUnload() {
    history.push("/");
  }

  renderUserList() {
    const { userData, match } = this.props;
    const activeUser = userData.users.filter(
      (user, i) => user.id === parseInt(match.params.id, 10)
    );
    const user = activeUser[0];
    return (
      <div className="user-detail-card">
        <Card className="custom-card-override">
          <Card.Content>
            <Card.Header className="user-title">{user.name}</Card.Header>
            <Card.Meta>
              <div className="text-container">
                <div className="key">Username: </div>
                <div className="value">{user.username}</div>
              </div>
              <div className="text-container">
                <div className="key">Email: </div>
                <div className="value">{user.email}</div>
              </div>
              <div className="text-container">
                <div className="key">Phone: </div>
                <div className="value">{user.phone}</div>
              </div>
              <div className="text-container">
                <div className="key">Website: </div>
                <div className="value">
                  <a target="_blank" href={"https://www." + user.website}>
                    {user.website}
                  </a>
                </div>
              </div>
              <div className="address-container">
                <div className="address-title">Address:</div>
                <div className="address-text">
                  <p>{user.address.street}</p>
                  <p>{user.address.city}</p>
                  <p>{user.address.zipcode}</p>
                </div>
              </div>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="building" />
              {user.company.name} | {user.company.catchPhrase}
            </a>
            {/* <Card.Description>{user.company.catchPhrase}</Card.Description> */}
            <Card.Description className="bs-container">
              {user.company.bs}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }

  render() {
    const { userData } = this.props;
    return (
      <div className="user-detail-container">
        <div className="page-title">User Detail Page</div>
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
        {userData.users && this.renderUserList()}
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
    }
  };
}

const UserDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedUserDetailPage);
export default UserDetailPage;
