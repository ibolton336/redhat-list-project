import { userdataActions } from "../_actions/userdata.actions";
import * as React from "react";
import { Breadcrumb, Dimmer, Loader } from "semantic-ui-react";
import { history } from "../_helpers";
import { connect } from "react-redux";
import { getSortedUsers } from "../_selectors";

import "./UserDetailPage.css";

interface IUserDetailPageProps {
  match: any;
  userData: any;
  setActiveUser: any;
  users: any;
}

export class ConnectedUserDetailPage extends React.Component<
  IUserDetailPageProps,
  any
> {
  // export const UserDetailPage: React.SFC<IUserDetailPageProps> = props => {
  // const { user } = props;
  componentDidMount() {
    this.props.setActiveUser(this.props.users, this.props.match.params.id);
  }
  render() {
    const { userData } = this.props;
    if (userData === null || userData.activeUser === null) {
      return (
        <div>
          <div styleName="title">Customers</div>
          <Breadcrumb styleName="breadcrumb-container">
            <Breadcrumb.Section onClick={() => history.push("/")}>
              User List
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>No User Found</Breadcrumb.Section>
          </Breadcrumb>
        </div>
      );
    }
    return (
      <div>
        <div styleName="title">Customers</div>
        <Breadcrumb styleName="breadcrumb-container">
          <Breadcrumb.Section onClick={() => history.push("/")}>
            User List
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>
            {this.props.match.params.id}
          </Breadcrumb.Section>
        </Breadcrumb>

        <div >id {userData.activeUser[0].id}</div>
        <div >name {userData.activeUser[0].name}</div>
        <div >username {userData.activeUser[0].username}</div>
        <div >name {userData.activeUser[0].name}</div>


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
    setActiveUser: (users, id) => {
      dispatch(userdataActions.setActiveUser(users, id));
    }
  };
}

const UserDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedUserDetailPage);
export default UserDetailPage;
