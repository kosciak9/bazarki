"""
finds and compares bazarki with actual poll results
"""
import re
from datetime import date
from twitterscraper import query_tweets
import functools


@functools.lru_cache()
def find_bazarki():
    """
    scrapes twitter for bazarki-like tweets
    returns list of them (tweet-like objects)

    use memoize=True to... memoize!
    """
    list_of_tweets = query_tweets(
        "#wybory2019 OR #WyboryParlamentarne2019 #bazarek",
        1,
        begindate=date(2019, 10, 11),
        enddate=date(2019, 10, 14),
    )

    bazarki = []
    # print the retrieved tweets to the screen:
    for tweet in list_of_tweets:
        regex_tester = r"pis.+\s[0-9]+"
        match = re.search(regex_tester, tweet.text, flags=re.I)
        if match:
            bazarki.append(
                {"text": tweet.text, "url": "https://twitter.com" + tweet.tweet_url}
            )

    print(f"znaleziono {len(bazarki)} bazarków")
    return bazarki


def compare_bazarki(bazarek_local):
    """
    based on results from PKW, takes text of bazarek
    and compares provided results with actual ones
    """
    results = [
        {
            "regex": r"pis.*\s(\d{0,2},\d{0,2})",
            "points": 43.59,
            "name": "PiS",
            "logo": "https://yt3.ggpht.com/-DvCzdG94NtA/AAAAAAAAAAI/AAAAAAAAAAA/-oKiOxH_0S8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
        },
        {
            "regex": r"ko.*\s(\d{0,2},\d{0,2})",
            "points": 27.40,
            "name": "KO",
            "logo": "https://opolskie.nowoczesna.org/wp-content/uploads/2018/10/1_logo-480x480.jpg",
        },
        {
            "regex": r"lewy.*\s(\d{0,2},\d{0,2})",
            "points": 12.56,
            "name": "Lewica",
            "logo": "https://lewica2019.pl/templates/lewica/images/lewica.png",
        },
        {
            "regex": r"koniczynki.*\s(\d{0,2},\d{0,2})",
            "points": 8.55,
            "name": "PSL",
            "logo": "https://www.psl.pl/wp-content/uploads/2019/02/Logo-Zielone-01-1.png",
        },
        {
            "regex": r"konf.*\s(\d{0,2},\d{0,2})",
            "points": 6.81,
            "name": "Konfederacja",
            "logo": "https://konfederacja.net/wp-content/uploads/2019/08/Konfederacja-WiN-LOGO-60px.png",
        },
    ]

    formatted = []

    for result in results:
        match = re.search(result["regex"], bazarek_local, flags=re.I)
        if match:
            result_from_bazarek = float(match.group(1).replace(",", "."))
            formatted.append(
                {
                    "name": result["name"],
                    "result_from_bazarek": result_from_bazarek,
                    "result": result["points"],
                }
            )
    return tuple(formatted)


if __name__ == "__main__":
    bazarek = """
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
    """
    compare_bazarki(bazarek)
