import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import { theme } from "../styles/theme";

const SearchList = ({
  place,
  searchVal,
}: {
  place: PlaceType;
  searchVal: string;
}) => {
  const regex = new RegExp(searchVal, "gi");
  const matchWord = (place.name.match(regex) ?? "")[0] ?? "";
  const startIdx = place.name.indexOf(matchWord);
  const endIdx = startIdx + matchWord.length;

  const beforeWord = place.name.slice(0, startIdx);
  const afterWord = place.name.slice(endIdx, place.name.length);

  return (
    <Wrapper>
      <div className="name">
        <span>{beforeWord}</span>
        <span className="match">{matchWord}</span>
        <span>{afterWord}</span>
      </div>
      <div className="address">{place.address}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 0.1rem solid lightgray;
  padding: 1.3rem 2rem;
  .name {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 135%;
    .match {
      color: ${theme.color.blue};
    }
  }
  .address {
    margin-top: 0.2rem;
    font-size: 1.4rem;
    line-height: 160%;
    color: ${theme.color.gray4};
  }
`;

export default SearchList;
