import React, { Fragment } from "react";
import Header from "../../_components/_common/Header";
import PostForm from "../../_components/_common/PostForm";
import PostFeed from "../../_components/PostFeed";

const Home = async () => {
  return (
    <Fragment>
      <Header label="Home" />
      <PostForm placeholder="What is happening" />
      <PostFeed />
    </Fragment>
  );
};

export default Home;
