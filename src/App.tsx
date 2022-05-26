import { useState } from "react";
import styled from "styled-components";
import maps from "../sample-data/maps.json";

interface PoeMap {
  name: string;
  layout: string;
  boss: string;
  cards: string[];
}

const WIKI_URL = "https://www.poewiki.net/wiki/";

const Container = styled.div``;

const MapsList = styled.div`
  border: 1px solid silver;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer``;

const getCards = (cards: string[]) => {
  return cards.map((card) => {
    const url = `${WIKI_URL}${card.replace(" ", "_")}`;
    return (
      <a key={card} href={url} target={"_blank"}>
        {card}
      </a>
    );
  });
};

export const App = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredMaps, setFilteredMaps] = useState<PoeMap[]>([]);

  const handleSearch = (input: string) => {
    setSearchInput(input);

    if (input === "" || input === " ") {
      setFilteredMaps([]);
    } else {
      setFilteredMaps(
        maps.filter((map) => {
          return map.name.toLowerCase().includes(input.toLowerCase());
        })
      );
    }
  };

  const handleClear = (key: string) => {
    if (key === "Escape") {
      setSearchInput("");
      setFilteredMaps([]);
    }
  };

  return (
    <Container>
      <input
        onChange={(event) => handleSearch(event.target.value)}
        onKeyUp={(event) => handleClear(event.key)}
        placeholder={"Search for a map"}
        type={"text"}
        value={searchInput}
      />
      {filteredMaps.map((map: PoeMap) => (
        <MapsList key={map.name}>
          <div>
            <a
              href={`${WIKI_URL}${map.name.replace(" ", "_")}_Map`}
              target={"_blank"}
            >
              {map.name}
            </a>
          </div>
          <div>Layout: {map.layout}</div>
          <div>Boss: {map.boss}</div>
          <CardContainer>Cards:{getCards(map.cards)}</CardContainer>
        </MapsList>
      ))}
      <Footer>
        {"Hey, if you want to "}
        <a href={"https://buymeacoffee.com/neurotech"}>{"buy me a coffee"}</a>
        {", I'd appreciate it. :)"}
      </Footer>
    </Container>
  );
};
