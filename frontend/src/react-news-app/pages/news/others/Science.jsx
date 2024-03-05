import React from "react";
import CommonHeading from "../../../components/news/CommonHeading";
import CurrentNewsPost from "../../../components/newsPosts/currentNews/CurrentNewsPost";

export default function Science({
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
      <CommonHeading />
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
    </>
  );
}
