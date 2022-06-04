import { palette } from "@neurotech/elements";
import styled from "styled-components";
import { WIKI_URL } from "../App";
import { HorizontalRule } from "./HorizontalRule";
import { MapTileProps } from "./MapTile";

import divinationCard from "../images/divination-card.png";

const MapTileContentContainer = styled.div`
  color: ${palette.lightgrey};
`;

const Layout = styled.div`
  font-size: 1.1rem;
  padding: 0 0 1rem 0;
`;

const NoLayout = styled.div`
  font-size: 1.1rem;
  padding: 1rem 0 0 0;
`;

const BossAndCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Boss = styled.div`
  display: flex;
`;

const BossIcon = styled.div`
  cursor: help;
  height: 24px;
  width: 24px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardList = styled.div``;

const DivinationCardIcon = styled.img`
  cursor: help;
  height: 24px;
  width: 24px;
  margin-left: 0.5rem;
`;

const CardLink = styled.a`
  flex: 0;
  margin-right: 0.5rem;

  :last-child {
    margin: 0;
  }
`;

const getCards = (cards: string[]) => {
  return cards.map((card) => {
    const url = `${WIKI_URL}${card.replace(" ", "_")}`;
    return (
      <CardLink key={card} href={url} target={"_blank"}>
        {card}
      </CardLink>
    );
  });
};

export const MapTileContent = ({ map }: MapTileProps) => (
  <MapTileContentContainer>
    <Layout>{map.layout}</Layout>
    <HorizontalRule />
    <BossAndCards>
      <Boss>
        <BossIcon title={"Map Boss"}>☠️</BossIcon> {map.boss}
      </Boss>
      {map.cards.length > 0 && (
        <CardContainer>
          <CardList>{getCards(map.cards)}</CardList>
          <DivinationCardIcon
            alt={"Divination cards that drop in this map."}
            src={divinationCard}
            title={"Divination cards that drop in this map."}
          />
        </CardContainer>
      )}
    </BossAndCards>
  </MapTileContentContainer>
);

export const NoContent = () => (
  <NoLayout>{"There is no data for this map."}</NoLayout>
);
