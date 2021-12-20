import styled from "styled-components";
import { OrangeTag, theme } from "../styles/theme";

const OrangePlaceBox = ({
  name,
  category,
}: {
  name: string;
  category: string[];
}) => {
  return (
    <Wrapper>
      {category?.length > 0 ? (
        <OrangeTag>{category[category.length - 1]}</OrangeTag>
      ) : (
        <OrangeTag>동네 장소</OrangeTag>
      )}
      <div className="place-name">{name}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${theme.color.orange_very_light};
  min-width: 15rem;
  max-width: 15rem;
  height: 10rem;
  border-radius: 1rem;
  padding: 1.2rem;
  box-sizing: border-box;
  border: 0.1rem solid ${theme.color.orange_light};

  .place-name {
    margin-top: 0.8rem;
    line-height: 150%;
    letter-spacing: -0.2%;
    font-size: 1.4rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`;

export default OrangePlaceBox;
