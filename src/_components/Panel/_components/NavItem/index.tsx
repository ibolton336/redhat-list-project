import * as React from "react";
import { Label } from "semantic-ui-react";
import "./PanelField.css";

interface INavItemProps {
  navItem: String;
}
export const NavItem: React.SFC<INavItemProps> = props => {
  const { navItem } = props;
  return <div className="nav-item">{navItem}</div>;
};
