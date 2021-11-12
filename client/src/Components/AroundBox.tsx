import styled from "styled-components";
import { ImageType } from "../Shared/type";
import { GrayTag, theme } from "../styles/theme";

const AroundBox = ({
  name,
  category,
  images,
}: {
  name: string;
  category: string[];
  images: ImageType[];
}) => {
  return (
    <Wrapper>
      {images.length > 0 && (
        <img className="thumbnail" alt="thumbnail" src={images[0].thumbnail} />
      )}
      <div className="content">
        <GrayTag>
          {category?.length > 0 ? category[category.length - 1] : "동네 장소"}
        </GrayTag>
        <div className="place-name">{name}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${theme.color.orange_very_light};
  border-radius: 1rem;
  margin-right: 0.8rem;
  box-sizing: border-box;
  width: 100%;
  border: 0.1rem solid ${theme.color.orange_light};
  .thumbnail {
    width: 100%;
    border-radius: 0rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem;
    .place-name {
      margin-top: 0.8rem;
      font-weight: 500;
      color: ${theme.color.gray7};
      line-height: 150%;
      letter-spacing: -0.2%;
      font-size: 1.5rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
`;

export default AroundBox;
