import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import { theme } from "../styles/theme";

const SearchList = ({
  place,
  searchVal,
  isExist,
}: {
  place: PlaceType;
  searchVal: string;
  isExist: boolean;
}) => {
  const regex = new RegExp(searchVal, "gi");
  const matchWord = (place.name.match(regex) ?? "")[0] ?? "";
  const startIdx = place.name.indexOf(matchWord);
  const endIdx = startIdx + matchWord.length;

  const beforeWord = place.name.slice(0, startIdx);
  const afterWord = place.name.slice(endIdx, place.name.length);

  return (
    <Wrapper {...{ isExist }}>
      <div className="name">
        <span>{beforeWord}</span>
        <span className="match">{matchWord}</span>
        <span>{afterWord}</span>
      </div>
      <div className="address">{place.address}</div>
      {isExist && (
        <div className="exist">이미 만들고 있는 테마에 추가된 가게예요!</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isExist: boolean }>`
  padding: 1.3rem 2rem;
  color: ${({ isExist }) =>
    isExist ? theme.color.gray3_5 : theme.color.gray7};
  .name {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 135%;
    .match {
      color: ${({ isExist }) =>
        isExist ? theme.color.gray3_5 : theme.color.dark_green};
    }
  }
  .address {
    margin-top: 0.2rem;
    font-size: 1.4rem;
    line-height: 160%;
    color: ${theme.color.gray4};
  }
  .exist {
    margin-top: 0.2rem;
    color: ${theme.color.orange};
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 160%;
  }
`;

export default SearchList;
