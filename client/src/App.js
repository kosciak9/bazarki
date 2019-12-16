/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Link, Route, useRoute } from "wouter";

import ComparePage from "./ComparePage";
import GetFromTwitterPage from "./GetFromTwitterPage";
import AboutProject from "./About";

function NavigationLink(props) {
  const [isActive] = useRoute(props.href);
  const classes = "pure-menu-item pure-menu-link ";
  return (
    <Link {...props}>
      <a className={isActive ? classes + "pure-menu-selected" : classes}>
        {props.children}
      </a>
    </Link>
  );
}

export default function App() {
  return (
    <Fragment>
      <nav
        css={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky"
        }}
        className="pure-menu pure-menu-horizontal"
      >
        <NavigationLink href="/">O projekcie</NavigationLink>
        <NavigationLink
          className="pure-menu-item pure-menu-link"
          href="/get-from-twitter"
        >
          Porównaj przechwycone z Twittera #bazarki z wynikami
        </NavigationLink>
        <NavigationLink
          className="pure-menu-item pure-menu-link"
          href="/compare"
        >
          Porównaj swój #bazarek z wynikami
        </NavigationLink>
      </nav>

      <Route path="/compare" component={ComparePage} />
      <Route path="/get-from-twitter" component={GetFromTwitterPage} />
      <Route path="/" exact component={AboutProject} />
    </Fragment>
  );
}
