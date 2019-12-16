/** @jsx jsx **/
import { jsx } from "@emotion/core";

import backgroundImage from "./background.jpg";

export default function AboutProject() {
  return (
    <div
      css={{
        minHeight: "calc(100vh - 35px)",
        width: "100%",
        textAlign: "center",
        marginRight: "auto",
        marginLeft: "auto",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.6em",
        fontWeight: "bold",
        color: "white",
        textShadow: "1px 1px 2px black"
      }}
    >
      <h2>O co chodzi?</h2>
      <p css={{ maxWidth: 600 }}>
        Projekt zaliczeniowy wykonany przez Franciszka Madeja oraz Bartłomieja
        Puchałę w ramach przedmiotu Eksploracja Danych (Informatyka Społeczna na
        WH AGH 2019).
      </p>
      <p css={{ maxWidth: 600 }}>
        Strona pozwala przeglądać #bazarki, czyli... ceny produktów w dzień
        wyborów. Czysto przypadkowo obok wyświetlają się też wyniki
        poszczególnych partii. Polecamy sprawdzić{" "}
        <a
          css={{ color: "white" }}
          target="_blank"
          href="https://twitter.com/MarcinPalade/status/1183426884979380224"
        >
          tego tweeta
        </a>{" "}
        ręcznie!
      </p>

      <h2>Obecne problemy:</h2>
      <p css={{ maxWidth: 600 }}>
        Kiepskie wyniki z Twittera, wiele znalezionych Twittów w ogóle nie jest
        powiązanych z tematem. Obecnie przeszukujemy go w następujący sposób:
      </p>
      <code css={{ backgroundColor: "black", padding: 8, borderRadius: 8 }}>
        "#wybory2019 OR #WyboryParlamentarne2019 #bazarek"
      </code>
      <p>w dniach 2019-10-11 do 2019-10-14.</p>

      <p>
        zdjęcie w tle:
        <a
          css={{ color: "white", padding: 4 }}
          href="https://unsplash.com/@nicotitto?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from nrd"
        >
          by @nrd from unsplash
        </a>
      </p>
    </div>
  );
}
