import React from "react";
import TopNewsTitle from "../topNews/TopNewsTitle";
import Ads from "../../../ads/Ads";
import TopNewsPost from "./TopNewsPost";
export default function TopNews({
  pageSize,
  country,
  language,
  sources,
  from,
  to,
  category,
  qurey,
}) {
  return (
    <>
      <TopNewsTitle />
      <div className="grid grid-cols-12 ">
        <Ads />
        <TopNewsPost
          pageSize={pageSize}
          country={country}
          language={language}
          sources={sources}
          from={from}
          to={to}
          category={category}
          qurey={qurey}
        />
      </div>
    </>
  );
}
