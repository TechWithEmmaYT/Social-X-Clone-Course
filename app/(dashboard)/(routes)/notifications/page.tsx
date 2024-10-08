import React, { Fragment } from "react";
import Header from "../../_components/_common/Header";
import NotificationFeed from "../../_components/NotificationFeed";

const Notifications = () => {
  return (
    <Fragment>
      <Header label="Notifications" showBackArrow />
      <NotificationFeed />
    </Fragment>
  );
};

export default Notifications;
