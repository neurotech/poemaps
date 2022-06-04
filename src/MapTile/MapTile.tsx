import { palette } from "@neurotech/elements";
import styled from "styled-components";
import { PoeMap, WIKI_URL } from "../App";
import { HorizontalRule } from "./HorizontalRule";
import { MapTileContent, NoContent } from "./MapTileContent";

export interface MapTileProps {
  map: PoeMap;
}

const MapTileContainer = styled.div<{ isValid: boolean }>`
  background-color: #32333e;
  border: 2px solid #131315;
  border-radius: 3px;
  padding: 1rem;
  margin-bottom: 1rem;
  opacity: ${(props) => (props.isValid ? 1 : 0.33)};
`;

const MapTileHeader = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const MapTile = ({ map }: MapTileProps) => {
  const isValid = map.boss !== "" && map.layout !== "";

  return (
    <MapTileContainer isValid={isValid}>
      <MapTileHeader>
        <a
          href={`${WIKI_URL}${map.name.replace(" ", "_")}_Map`}
          target={"_blank"}
        >
          {map.name}
        </a>
      </MapTileHeader>
      {isValid ? <MapTileContent map={map} /> : <NoContent />}
    </MapTileContainer>
  );
};
