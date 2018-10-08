import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../HomePage";
import UserDetailPage from "../UserDetailPage";
import { Panel } from "../_components/Panel";

export class App extends React.Component<any, any> {
  componentDidMount() {}
  public render() {
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
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/user/:id" component={UserDetailPage} />
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
