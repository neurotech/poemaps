import { palette } from "@neurotech/elements";
import styled, { css } from "styled-components";
import { Mechanic } from "../App";

const MechanicsContainer = styled.div`
  display: flex;
`;

const getBadgeVariant = (mechanic: Mechanic) => {
  switch (mechanic) {
    case "blight":
      return css`
        background-color: ${palette.darkyellow};
        border: 1px solid ${palette.yellow};
        color: ${palette.lightyellow};
      `;

    default:
    case "delirium":
      return css`
        background-color: ${palette.darkgrey};
        border: 1px solid ${palette.grey};
        color: ${palette.lightgrey};
      `;
  }
};

const Badge = styled.span<{ mechanic: Mechanic }>`
  ${(props) => getBadgeVariant(props.mechanic)}

  border-radius: 4px;
  cursor: help;
  font-size: 12px;
  line-height: 21px;
  padding: 0 0.33rem;
  text-transform: capitalize;
  user-select: none;
`;

export const Mechanics = ({ mechanics }: { mechanics: Mechanic[] }) => {
  return (
    <MechanicsContainer>
      {mechanics.map((mechanic) => (
        <Badge
          key={mechanic}
          mechanic={mechanic}
          title={"Ideal for this mechanic."}
        >
          {mechanic}
        </Badge>
      ))}
    </MechanicsContainer>
  );
};
