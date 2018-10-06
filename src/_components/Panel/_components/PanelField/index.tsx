import * as React from "react";
import { Label } from "semantic-ui-react";
import "./PanelField.css";

interface IPanelFieldProps {
  fieldName: String;
  fieldValue: any;
}
export const PanelField: React.SFC<IPanelFieldProps> = props => {
  const { fieldName, fieldValue } = props;
  return (
    <div className="field-flex-grid">
      {typeof fieldValue === "string" && (
        <React.Fragment>
          <div className="field-name-col">{fieldName}</div>
          <div className="field-value-col">{fieldValue}</div>
        </React.Fragment>
      )}
      {typeof fieldValue === "boolean" &&
        fieldName === "Status" && (
          <React.Fragment>
            <div className="field-name-col">{fieldName}</div>
            {fieldValue ? (
              <div className="active-field-value-col">
                <p className="status-text">Active</p>
              </div>
            ) : (
              <div className="field-value-col inactive">
                <p className="status-text">Inactive</p>
              </div>
            )}
          </React.Fragment>
        )}
    </div>
  );
};
