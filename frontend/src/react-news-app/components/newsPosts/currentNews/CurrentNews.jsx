import React from "react";
import Ads from "../../../ads/Ads";
import CurrentNewsTitle from "./CurrentNewsTitle";
import CurrentNewsPost from "./CurrentNewsPost";
export default function CurrentNews({
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
      <CurrentNewsTitle />
      <div className="grid grid-cols-12 ">
        <Ads />
        <CurrentNewsPost
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
