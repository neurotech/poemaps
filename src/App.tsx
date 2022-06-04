import { useState } from "react";
import styled from "styled-components";
import { Input } from "@neurotech/elements";
import { maps } from "./maps";
import { MapTile } from "./MapTile/MapTile";

export interface PoeMap {
  name: string;
  layout: string;
  boss: string;
  cards: string[];
  author?: string;
}

export const WIKI_URL = "https://www.poewiki.net/wiki/";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HideMapsWithNoData = styled.div`
  width: 200px;
`;

const MapsContainer = styled.div`
  flex: 1;
  margin-top: 1rem;
`;

const Footer = styled.footer`
  text-align: center;
`;

export const App = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredMaps, setFilteredMaps] = useState<PoeMap[]>([]);
  const [hideMaps, setHideMaps] = useState<boolean>(false);

  const handleSearch = (input: string) => {
    setSearchInput(input);

    if (input === "" || input === " ") {
      setFilteredMaps([]);
    } else {
      const sortedMaps = maps.sort((a: PoeMap, b: PoeMap) =>
        a.name.localeCompare(b.name)
      );

      setFilteredMaps(
        sortedMaps.filter((map) => {
          if (hideMaps && map.layout === "") {
            return;
          }

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

  const handleHideMaps = (checked: boolean) => {
    setHideMaps(!hideMaps);

    const sortedMaps = maps.sort((a: PoeMap, b: PoeMap) =>
      a.name.localeCompare(b.name)
    );

    setFilteredMaps(
      sortedMaps.filter((map) => {
        if (checked && map.layout === "") {
          return;
        }

        return map.name.toLowerCase().includes(searchInput.toLowerCase());
      })
    );
  };

  return (
    <Container>
      <Toolbar>
        <Input
          fullWidth
          onChange={(event) => handleSearch(event.target.value)}
          onKeyUp={(event) => handleClear(event.key)}
          placeholder={"Search for a map"}
          value={searchInput}
        />
        <HideMapsWithNoData>
          <input
            checked={hideMaps}
            onChange={(event) => handleHideMaps(event.target.checked)}
            type={"checkbox"}
          />
          {"Hide maps with no data"}
        </HideMapsWithNoData>
      </Toolbar>
      <MapsContainer>
        {filteredMaps.map((map: PoeMap) => (
          <MapTile key={map.name} map={map} />
        ))}
      </MapsContainer>
      <Footer>
        {"Hey, if you want to "}
        <a href={"https://buymeacoffee.com/neurotech"}>{"buy me a coffee"}</a>
        {"... I'd appreciate it. 🙂"}
      </Footer>
    </Container>
  );
};
