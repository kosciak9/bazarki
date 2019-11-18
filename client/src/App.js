/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Link, Route } from "wouter";

import ComparePage from "./ComparePage";
import GetFromTwitterPage from "./GetFromTwitterPage";

export default function App() {
  return (
    <Fragment>
      <nav
        css={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        className="pure-menu pure-menu-horizontal"
      >
        <Link className="pure-menu-item pure-menu-link" href="/compare">
          Porównaj swój #bazarek z wynikami
        </Link>
        <Link
          className="pure-menu-item pure-menu-link"
          href="/get-from-twitter"
        >
          Porównaj przechwycone z Twittera bazarki z wynikami
        </Link>
      </nav>

      <Route path="/compare" component={ComparePage} />
      <Route path="/get-from-twitter" component={GetFromTwitterPage} />
    </Fragment>
  );
}
