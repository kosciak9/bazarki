/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import Comparator from "./Comparator";

export default function ComparePage() {
  const [customText, setCustomText] = useState(`Markus Informator
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
#wybory2019 #wybory #WyboryParlamentarne2019`);
  return (
    <div css={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div css={{ padding: 32 }}>
        <form
          className="pure-form"
          css={{ display: "flex", flexDirection: "column" }}
        >
          <textarea
            className="pure-input"
            css={{ width: "100%", height: 500, resize: "none" }}
            value={customText}
            onChange={e => {
              setCustomText(e.target.value);
              console.log("test");
            }}
          />
        </form>
      </div>
      <div css={{ padding: 32 }}>
        <Comparator text={customText} />
      </div>
    </div>
  );
}
