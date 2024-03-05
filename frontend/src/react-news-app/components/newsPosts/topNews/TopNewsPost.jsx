import React, { useState, useEffect } from "react";
import newsImage from "../../../../images/default/news.png";
import { ImEye } from "react-icons/im";
import { FaShare } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import moment from "moment";
import Loading from "../../../loading/Loading";
export default function TopNewsPost({
  pageSize,
  country,
  language,
  sources,
  from,
  to,
  category,
  qurey,
}) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const Api = `https://gnews.io/api/v4/`;
  const apiKey = "7f769195797b0b58d8447626c58093fc"; // if Api has been expired then change the api key here
  useEffect(() => {
    setLoading(true);
    const fetchGNewsApiData = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.articles) {
          setLoading(false);
          setNews((prev) => [...prev, ...data.articles]);
        } else {
          console.log("Api has been expired! Please change Api key?");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGNewsApiData(
      `${Api}${sources}?category=${category}&lang=${language}&country=${country}&from=${from}&to=${to}&max=${pageSize}&page=${page}&apikey=${apiKey}`
    );
  }, [
    Api,
    sources,
    category,
    language,
    country,
    from,
    to,
    pageSize,
    page,
    apiKey,
  ]);
  useEffect(() => {
    setLoading(true);
    const fetchGNewsApiSearchData = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.articles) {
          setLoading(false);
          setNews((prev) => [...prev, ...data.articles]);
        } else {
          console.log("Api has been expired! Please change Api key?");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGNewsApiSearchData(
      `${Api}${sources}?search?${
        qurey ? `q=${qurey}&` : `q=${category}&`
      }category=${category}&lang=${language}&country=${country}&max=${pageSize}&page=${page}&apikey=${apiKey}`
    );
  }, [
    Api,
    qurey,
    sources,
    category,
    language,
    country,
    pageSize,
    page,
    apiKey,
  ]);

  useEffect(() => {
    const handleInfinateScroll = () => {
      const windowHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const scrollReach = document.documentElement.scrollTop;
      try {
        if (viewHeight + scrollReach + 1 >= windowHeight) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        alert(error);
      }
    };
    window.addEventListener("scroll", handleInfinateScroll);
    return () => window.removeEventListener("scroll", handleInfinateScroll);
  }, []);
  if (qurey) {
    return (
      <>
        <div className="col-span-12 md:col-span-7">
          {loading && <Loading />}
          <div className="mb-4 mt-2 mx-2 ">
            <div className=" md:w-96 lg:w-[480px] mx-auto space-y-4 ">
              {news.map((item, i) => (
                <div
                  key={i}
                  className="p-2 bg-gray-50  shadow-md rounded-md cursor-pointer"
                >
                  <h1 className="py-1 font-serif">{item.title}</h1>

                  <div className="flex space-x-1 justify-end items-center pb-1 px-2">
                    <BiWorld />
                    <small className="">
                      {moment(item.publishedAt, "YYYYMMDD")
                        .startOf("hour")
                        .fromNow()}
                    </small>
                  </div>
                  <div className="px-2">
                    <img
                      src={item.image ? item.image : newsImage}
                      alt=""
                      className="w-full h-auto rounded-md shadow-md"
                    />
                  </div>
                  <div className="p-2">
                    {item.description}
                    <small className="text-blue-300 underline cursor-pointer ml-2">
                      <a href={item.url}>read more ....</a>
                    </small>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img
                        src={item.image ? item.image : newsImage}
                        alt="user_picture"
                        className="h-10 w-10 rounded-full border"
                      />
                      <small>By {item.source.name}</small>
                    </div>
                    <small className="flex items-center space-x-1 p-4">
                      <span>120k</span>
                      <ImEye />
                      <span>.</span>
                      <span>123k</span>
                      <FaShare className=" cursor-pointer" />
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-span-12 md:col-span-7">
        <div className="mb-4 mt-2 mx-2 ">
          <div className=" md:w-96 lg:w-[480px] mx-auto space-y-4 ">
            {news.map((item, i) => (
              <div
                key={i}
                className="p-2 bg-gray-50  shadow-md rounded-md cursor-pointer"
              >
                <h1 className="py-1 font-serif">{item.title}</h1>

                <div className="flex space-x-1 justify-end items-center pb-1 px-2">
                  <BiWorld />
                  <small className="">
                    {moment(item.publishedAt, "YYYYMMDD")
                      .startOf("hour")
                      .fromNow()}
                  </small>
                </div>
                <div className="px-2">
                  <img
                    src={item.image ? item.image : newsImage}
                    alt=""
                    className="w-full h-auto rounded-md shadow-md"
                  />
                </div>
                <div className="p-2">
                  {item.description}
                  <small className="text-blue-300 underline cursor-pointer ml-2">
                    <a href={item.url}>read more ....</a>
                  </small>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.image ? item.image : newsImage}
                      alt="user_picture"
                      className="h-10 w-10 rounded-full border"
                    />
                    <small>By {item.source.name}</small>
                  </div>
                  <small className="flex items-center space-x-1 p-4">
                    <span>120k</span>
                    <ImEye />
                    <span>.</span>
                    <span>123k</span>
                    <FaShare className=" cursor-pointer" />
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </>
  );
}
