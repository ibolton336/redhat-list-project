import * as React from "react";
import { connect } from "react-redux";
import { userdataActions } from "../_actions/userdata.actions";
import { Dimmer, Header, Loader } from "semantic-ui-react";
import "./HomePage.css";
import ReactTable from "react-table";
import 'react-table/react-table.css'

class ConnectedHomePage extends React.Component<any, any> {
  componentDidMount() {

    this.props.getLatest();
  }

  render() {
    const columns = [
      {
        Header: 'Email',
        accessor: 'email' // String-based value accessors!
      }, {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone',
        accessor: 'phone' // String-based value accessors!
      }, {
        Header: 'Username',
        accessor: 'username',
      }
    ]

    if (this.props.userdata.users === null) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>

      )

    }
    return (
      <div className="home-container">
        <Header as='h2'>Redhat Users </Header>

        <div className="row">
          <ReactTable
            data={this.props.userdata.users}
            columns={columns}
          />
        </div>
        <div className="row">
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLatest: () => {
      dispatch(userdataActions.getLatest())
    }
  };
}

function mapStateToProps(state) {
  return {
    userdata: state.userdata
  };
}
const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHomePage);
export default HomePage;
