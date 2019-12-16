/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import wretch from "wretch";
import TweetEmbed from "react-tweet-embed";
import Comparator from "./Comparator";

export default function GetFromTwitterPage() {
  const [tweets, setTweets] = useState({ items: [], shouldFetch: true });
  useEffect(() => {
    if (tweets.shouldFetch) {
      wretch("/bazarki")
        .content("application/json")
        .get()
        .json()
        .then(response => setTweets({ shouldFetch: false, items: response }));
    }
  }, [tweets.shouldFetch]);

  return tweets.items.map(tweet => {
    // https://twitter.com/Frontowiec2/status/1182763478454591490
    const grabIdRegex = /https:\/\/twitter\.com\/.*\/status\/([0-9]+)/;
    const id = tweet.url.match(grabIdRegex)[1];

    return (
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TweetEmbed id={id} />
        <Comparator css={{ marginLeft: 16 }} text={tweet.text} />
      </div>
    );
  });
}
