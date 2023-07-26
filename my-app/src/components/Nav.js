import React, { Children } from "react";
import { Link } from "react-router-dom";
import { useResolvedPath } from "react-router-dom";
import { useMatch } from "react-router-dom";

export default function Nav(props) {
  return (
    <div className="nav-holder">
      <div className="cyrpto-title-nav">Crypto</div>
      <CustomLink to="/">Global 100</CustomLink>
      <CustomLink to="/categories">Categories</CustomLink>
      <CustomLink to="/coin-search">Coin Search</CustomLink>
      <CustomLink to="/exchange-data">Exchanges</CustomLink>
      <CustomLink to="/derivatives">Derivatives</CustomLink>

      <CustomLink to="/crypto-charts">Charts</CustomLink>

      <div className="cyrpto-title-nav">Economy</div>
      <CustomLink to="/money-supply">Money Supply</CustomLink>
      <CustomLink to="/consumer">Consumer</CustomLink>
      <CustomLink to="/yield">Yield</CustomLink>
      <CustomLink to="/econ-charts">Charts</CustomLink>

      <div className="cyrpto-title-nav">Both</div>

      <CustomLink to="/news">News</CustomLink>
      <CustomLink to="/currency-rates">Currency Rates</CustomLink>
    </div>
  );
  function CustomLink(to) {
    const resolvedPath = useResolvedPath(to.to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
      <Link to={to.to} className={isActive ? "active" : "not-active"}>
        {to.children}
      </Link>
    );
  }
}
