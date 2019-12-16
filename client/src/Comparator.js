/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import wretch from "wretch";

export default function Comparator(props) {
  const { text } = props;
  const [previousText, setPreviousText] = useState(text);
  const [response, setResponse] = useState({ items: [], shouldFetch: true });

  const average =
    response.items.reduce((average, item) => {
      average += Math.abs(item.result - item.result_from_bazarek);
      return average;
    }, 0) / response.items.length;

  useEffect(() => {
    if (previousText !== text) {
      setResponse({ shouldFetch: true, items: [] });
      setPreviousText(text);
    }
    if (response.shouldFetch) {
      wretch("/compare")
        .content("application/json")
        .body(JSON.stringify({ text }))
        .post()
        .json()
        .then(response => setResponse({ items: response, shouldFetch: false }));
    }
  }, [text, response, previousText]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 16
      }}
    >
      {response.items.length > 0 ? (
        <Fragment>
          <table {...props} className="pure-table">
            <thead>
              <tr>
                <td>Ugrupowanie</td>
                <td>Wynik z wyborów</td>
                <td>Wynik wg bazarka</td>
                <td>Różnica</td>
              </tr>
            </thead>
            <tbody>
              {response.items.map(result => (
                <tr key={result.name}>
                  <td>{result.name}</td>
                  <td>{result.result}%</td>
                  <td>{result.result_from_bazarek}%</td>
                  <td>
                    {(result.result - result.result_from_bazarek).toFixed(2)}{" "}
                    p.p.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isNaN(average) && (
            <div css={{ padding: 24, textAlign: "center" }}>
              <h2>
                <span
                  css={{
                    color:
                      average < 0.5 ? "green" : average < 3 ? "orange" : "red",
                    padding: 8,
                    margin: 4,
                    backgroundColor: "rgba(200, 200, 200, 0.3)",
                    borderRadius: 4
                  }}
                >
                  {average.toFixed(2)}
                </span>
              </h2>
              <h4>ocena bazarka - (średnie odchylenie)</h4>
            </div>
          )}
        </Fragment>
      ) : (
        <h2>Bazarek nie jest kompatybilny :(</h2>
      )}
    </div>
  );
}
