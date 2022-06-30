import React from "react";
import Search from "../components/Search";
import MainLayout from "../layouts/MainLayout";

const SearchPage = () => {
  return <MainLayout contentName="SEARCH RESULT" content={<Search />} />;
};

export default SearchPage;
