import React, { useState, useReducer } from "react";

import { Routes, Route } from "react-router-dom";
import Error404 from "../src/Error404";
import Home from "./react-news-app/pages/Home";
import News from "./react-news-app/pages/news/News";

import CurrentNews from "./react-news-app/components/newsPosts/currentNews/CurrentNews";

import TopNews from "./react-news-app/components/newsPosts/topNews/TopNews";

import Latest from "./react-news-app/pages/news/Latest";
import Sports from "./react-news-app/pages/news/Sports";
import Lifestyle from "./react-news-app/pages/news/Lifestyle";
import Culture from "./react-news-app/pages/news/Culture";

import Jermany from "./react-news-app/pages/news/others/Jermany";
import Business from "./react-news-app/pages/news/others/Business";

import Science from "./react-news-app/pages/news/others/Science";
import Tech from "./react-news-app/pages/news/others/Tech";

import Profile from "./react-news-app/pages/profile/Profile";

import Settings from "./react-news-app/pages/profile/personalize/Settings";
import Account from "./react-news-app/components/profile/personalize/settings/outlet/Account";
import Email from "./react-news-app/components/profile/personalize/settings/outlet/Email";
import Password from "./react-news-app/components/profile/personalize/settings/outlet/Password";
import Privacy from "./react-news-app/components/profile/personalize/settings/outlet/Privacy";
import EmailNotification from "./react-news-app/components/profile/personalize/settings/outlet/EmailNotification";
import UserDetails from "./react-news-app/components/profile/personalize/settings/outlet/UserDetails";
import DeleteUser from "./react-news-app/components/profile/personalize/settings/outlet/DeleteUser";

import Activity from "./react-news-app/pages/profile/personalize/Activity";
import Favourite from "./react-news-app/pages/profile/personalize/Favourite";
import History from "./react-news-app/pages/profile/personalize/History";
import Save from "./react-news-app/pages/profile/personalize/Save";

import Login from "./react-news-app/auth/Login";
import Register from "./react-news-app/auth/Register";
import ForgetPassword from "./react-news-app/auth/ForgetPassword";
import ResetPassword from "./react-news-app/auth/ResetPassword";
import moment from "moment";
export default function App() {
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  const lastDay = moment()
    .subtract(3, "day")
    .utc()
    .format("YYYY-MM-DDThh:mm:ss");
  const from = lastDay + "Z";
  const currentDay = moment().utc().format("YYYY-MM-DDThh:mm:ss");
  const to = currentDay + "Z";
  const [search, setSearch] = useState("");
  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
  };
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              search={search}
              handleSearch={handleSearch}
              update={update}
              forceUpdate={forceUpdate}
            />
          }
        >
          <Route exact path="/" element={<News />}>
            <Route
              index
              element={
                <CurrentNews
                  key="news"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="general"
                  qurey={search}
                />
              }
            />

            <Route
              exact
              path="/topnews"
              element={
                <TopNews
                  key="topnews"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="general"
                  qurey={search}
                />
              }
            />
          </Route>

          <Route exact path="/latest" element={<Latest />}>
            <Route
              index
              element={
                <CurrentNews
                  key="latest"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="general"
                  qurey={search}
                />
              }
            />

            <Route
              exact
              path="/latest/topnews"
              element={
                <TopNews
                  key="latestTopnews"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="general"
                  qurey={search}
                />
              }
            />
          </Route>

          <Route exact path="/sports" element={<Sports />}>
            <Route
              index
              element={
                <CurrentNews
                  key="sports"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="sports"
                  qurey={search}
                />
              }
            />

            <Route
              exact
              path="/sports/topnews"
              element={
                <TopNews
                  key="sportsTopnews"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="sports"
                  qurey={search}
                />
              }
            />
          </Route>
          <Route exact path="/lifestyle" element={<Lifestyle />}>
            <Route
              index
              element={
                <CurrentNews
                  key="lifestyle"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="health"
                  qurey={search}
                />
              }
            />

            <Route
              exact
              path="/lifestyle/topnews"
              element={
                <TopNews
                  key="lifestyleTopnews"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="health"
                  qurey={search}
                />
              }
            />
          </Route>
          <Route exact path="/culture" element={<Culture />}>
            <Route
              index
              element={
                <CurrentNews
                  key="culture"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="entertainment"
                  qurey={search}
                />
              }
            />

            <Route
              exact
              path="/culture/topnews"
              element={
                <TopNews
                  key="cultureTopnews"
                  pageSize={5}
                  country="us"
                  language="en"
                  sources="top-headlines"
                  from={from}
                  to={to}
                  category="entertainment"
                  qurey={search}
                />
              }
            />
          </Route>
          <Route
            exact
            path="/others/jermany"
            element={
              <Jermany
                key="jermany"
                pageSize={5}
                country="de"
                language="de"
                sources="top-headlines"
                from={from}
                to={to}
                category="general"
                qurey={search}
              />
            }
          />
          <Route
            exact
            path="/others/business"
            element={
              <Business
                key="business"
                pageSize={5}
                country="us"
                language="us"
                sources="top-headlines"
                from={from}
                to={to}
                category="business"
                qurey={search}
              />
            }
          />
          <Route
            exact
            path="/others/science"
            element={
              <Science
                key="science"
                pageSize={5}
                country="us"
                language="us"
                sources="top-headlines"
                from={from}
                to={to}
                category="science"
                qurey={search}
              />
            }
          />
          <Route
            exact
            path="/others/tech"
            element={
              <Tech
                key="tech"
                pageSize={5}
                country="us"
                language="us"
                sources="top-headlines"
                from={from}
                to={to}
                category="technology"
                qurey={search}
              />
            }
          />

          <Route
            path="/profile"
            element={<Profile update={update} forceUpdate={forceUpdate} />}
          />

          <Route path="/settings" element={<Settings />}>
            <Route
              index
              element={<Account update={update} forceUpdate={forceUpdate} />}
            />
            <Route
              path="/settings/email"
              element={<Email update={update} forceUpdate={forceUpdate} />}
            />
            <Route
              path="/settings/password"
              element={<Password update={update} forceUpdate={forceUpdate} />}
            />
            <Route
              path="/settings/privacy"
              element={<Privacy update={update} forceUpdate={forceUpdate} />}
            />
            <Route
              path="/settings/email-notificaiton"
              element={
                <EmailNotification update={update} forceUpdate={forceUpdate} />
              }
            />
            <Route
              path="/settings/user-information"
              element={
                <UserDetails update={update} forceUpdate={forceUpdate} />
              }
            />
            <Route
              path="/settings/delete-account"
              element={<DeleteUser update={update} forceUpdate={forceUpdate} />}
            />
          </Route>

          <Route path="/activity" element={<Activity update={update} />} />

          <Route path="/favourite" element={<Favourite update={update} />} />
          <Route path="/history" element={<History update={update} />} />
          <Route path="/save" element={<Save update={update} />} />

          <Route path="/login" element={<Login forceUpdate={forceUpdate} />} />
          <Route
            path="/register"
            element={<Register forceUpdate={forceUpdate} />}
          />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/api/user/reset/:token" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}
