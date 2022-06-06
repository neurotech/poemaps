import { useState } from "react";
import styled from "styled-components";
import { Button, Input, palette } from "@neurotech/elements";
import { maps } from "./maps";
import { MapTile } from "./MapTile/MapTile";
import logo from "./images/logo.png";

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

const Logo = styled.img`
  margin-right: 1.5rem;
`;

const HideMapsWithNoData = styled.div`
  display: flex;
  margin-left: 1.5rem;
  width: 250px;
  align-self: stretch;
`;

const MapsContainer = styled.div`
  flex: 1;
  margin-top: 1rem;
`;

const Footer = styled.footer`
  color: ${palette.grey};
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
        <Logo src={logo} />
        <Input
          fullWidth
          onChange={(event) => handleSearch(event.target.value)}
          onKeyUp={(event) => handleClear(event.key)}
          placeholder={"Search for a map"}
          value={searchInput}
        />
        <HideMapsWithNoData>
          <Button
            fullWidth
            label={
              hideMaps ? "Show maps with no data" : "Hide maps with no data"
            }
            onClick={() => handleHideMaps(!hideMaps)}
            variant={"green"}
          />
        </HideMapsWithNoData>
      </Toolbar>
      <MapsContainer>
        {filteredMaps.map((map: PoeMap) => (
          <MapTile key={map.name} map={map} />
        ))}
      </MapsContainer>
      <Footer>
        {"Hey, if you want to "}
        <a href={"https://buymeacoffee.com/neurotech"} target={"_blank"}>
          {"buy me a coffee"}
        </a>
        {"... I'd appreciate it. 🙂"}
      </Footer>
    </Container>
  );
};
