import React, { Fragment } from "react";
import Header from "../../_components/_common/Header";
import SearchForm from "../../_components/SearchForm";
import SearchFeed from "../../_components/SearchFeed";

const Search = () => {
  return (
    <Fragment>
      <Header showBorder={false} showBackArrow>
        <SearchForm />
      </Header>
      <SearchFeed />
    </Fragment>
  );
};

export default Search;
