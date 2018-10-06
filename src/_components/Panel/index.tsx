import * as React from "react";
import { connect } from "react-redux";
import { Dimmer, Header, Loader } from "semantic-ui-react";
import { PanelField } from "./_components/PanelField";
import "./Panel.css";
class PanelFieldsModel {
  fieldName: String;
  fieldValue: any;
}

interface IPanelProps {
  fields: Array<PanelFieldsModel>;
  navItems: Array<String>;
}
interface IPanelState {
  activeIndex: Number;
}

export class Panel extends React.Component<IPanelProps, IPanelState> {
  state = {
    activeIndex: 0
  };

  toggleClass = index => {
    this.setState({ activeIndex: index });
    console.log("index", index);
  };

  render() {
    const { fields, navItems } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="panel-container">
        <div className="nav-container">
          <div className="nav-title">OpenShift</div>
          <div className="nav-items">
            {navItems.map((item, i) => (
              <div
                className={activeIndex === i ? "active-nav-item" : "nav-item"}
                key={i}
                onClick={() => this.toggleClass(i)}
              >
                <p className="nav-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="content-container">
          <div className="info-container">
            <div className="header-text">Panel Content</div>
            <div className="body-copy">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
              gravida augue, a semper massa. Sed sed sodales lectus, semper
              rhoncus ex. Phasellus augue mauris, molestie a tincidunt in,
              commodo ac mi. Integer vel facilisis est, eget maximus augue.
            </div>
          </div>
          <div className="fields-container">
            {fields.map((field, i) => (
              <PanelField
                fieldName={field.fieldName}
                fieldValue={field.fieldValue}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
