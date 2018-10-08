import * as React from "react";
import { connect } from "react-redux";
import {
  Breadcrumb,
  Dimmer,
  Loader,
  Card,
  Icon,
  Image,
  Button,
  List
} from "semantic-ui-react";
import "./UserDetailCard.css";

interface IUserDetailCardProps {
  user: any;
  favorites: any;
  isFavorite: boolean;
  setFavorites: any;
}
interface IUserDetailCardState {
  activeIndex: Number;
}

export class UserDetailCard extends React.Component<
  IUserDetailCardProps,
  IUserDetailCardState
> {
  state = {
    activeIndex: 0
  };
  toggleFavorite(user, toAdd) {
    let { favorites } = this.props;
    favorites = toAdd
      ? favorites.concat(user)
      : favorites.filter(current => user.id !== current.id);
    this.props.setFavorites(favorites);
    // this.setState({ favorites });
  }

  render() {
    const { isFavorite } = this.props;
    const user = this.props.user[0];
    return (
      <div className="user-detail-card">
        <Card className="custom-card-override">
          <Card.Content>
            <Card.Header className="user-title">
              {user.name}
              <Button
                toggle={isFavorite}
                active={isFavorite}
                icon
                className="bookmark-button"
                onClick={() => {
                  if (isFavorite) {
                    this.toggleFavorite(user, false);
                  } else {
                    this.toggleFavorite(user, true);
                  }
                }}
              >
                <Icon name="bookmark" size="large" />
                Bookmark
              </Button>
            </Card.Header>
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
                  <p>
                    {user.address.city}, {user.address.state}
                  </p>
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
            <Card.Description className="bs-container">
              {user.company.bs}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
