/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import wretch from "wretch";

export default function ComparePage() {
  const [customText, setCustomText] = useState(`
    Markus Informator
    @Patriota1989
    UWAGA
    ❕

    Ostatni dzisiaj raport z #bazarek!

    Ceny z #bazarek na godzinę 20:00:
    Pistacje 47,9 zł
    Kolendra 25,1 zł
    Zlewy 10,7 zł
    Koniczynki 7,5 zł
    Konfitury 4,9 zł.
    #wybory2019 #wybory #WyboryParlamentarne2019'
  `);
  const [response, setResponse] = useState([]);
  const handleSubmit = async event => {
    event.preventDefault();
    const response = await wretch("/compare")
      .content("application/json")
      .body(JSON.stringify({ text: customText }))
      .post()
      .json();
    setResponse(response);
  };
  return (
    <div css={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div css={{ padding: 32 }}>
        <form
          className="pure-form"
          onSubmit={handleSubmit}
          css={{ display: "flex", flexDirection: "column" }}
        >
          <textarea
            css={{ width: "100%", height: 500 }}
            value={customText}
            onChange={e => setCustomText(e.target.value)}
          />
          <button css={{ marginTop: 8 }} className="pure-button">
            Porównaj!
          </button>
        </form>
      </div>
      <div css={{ padding: 32 }}>
        <table className="pure-table">
          <thead>
            <tr>
              <td>Ugrupowanie</td>
              <td>Wynik z wyborów</td>
              <td>Wynik wg bazarka</td>
              <td>Różnica</td>
            </tr>
          </thead>
          <tbody>
            {response.map(result => (
              <tr>
                <td>{result.name}</td>
                <td>{result.result}%</td>
                <td>{result.result_from_bazarek}%</td>
                <td>
                  {(result.result - result.result_from_bazarek).toFixed(2)} p.p.
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
