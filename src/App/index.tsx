import React from "react";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { alertActions } from "../_actions";
import { Button, Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { history } from "../_helpers";
import HomePage from "../HomePage";
import { Panel } from "../_components/Panel";

const styles = require("./App.less");
const options = {
  allowMultiple: true
};
@CSSModules(styles, options)
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }
  componentDidMount() {}
  public render() {
    const { alert } = this.props;
    const navItems = ["One", "Two", "Three"];
    const fields = [
      {
        fieldName: "Case ID",
        fieldValue: "Case0002b"
      },
      {
        fieldName: "Case Name",
        fieldValue: "Development case instance"
      },
      {
        fieldName: "Status",
        fieldValue: true
      },
      {
        fieldName: "State",
        fieldValue: "Started on March 16th, 2017"
      }
    ];
    return (
      <Container>
        {alert.message && (
          <div styleName={`alert ${alert.type}`}>{alert.message.message}</div>
        )}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/panel"
            render={() => <Panel fields={fields} navItems={navItems} />}
          />
        </Switch>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
