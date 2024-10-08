"use client";
import Logo from "@/components/logo";
import { Spinner } from "@/components/spinner";
import useUser from "@/hooks/useUser";
import React, { Fragment } from "react";
import Header from "../../_components/_common/Header";
import UserHero from "../../_components/UserHero";
import UserBio from "../../_components/UserBio";
import PostFeed from "../../_components/PostFeed";

interface PropType {
  params: {
    username: string;
  };
}

const SingleUser = (props: PropType) => {
  const { username } = props.params;
  const { data, isLoading } = useUser(username);
  const fetchedUser: UserType = data?.data;

  console.log(fetchedUser);

  if (isLoading || !data) {
    return (
      <div
        className="flex flex-col h-full
       items-center justify-center"
      >
        <Logo width="50px" height="50px" className="animate-pulse" />
        <Spinner size="icon" />
      </div>
    );
  }
  return (
    <Fragment>
      <Header label={fetchedUser?.name || ""} showBackArrow />
      <UserHero user={fetchedUser} />
      <UserBio user={fetchedUser} />
      <PostFeed userId={fetchedUser?.id} />
    </Fragment>
  );
};

export default SingleUser;
