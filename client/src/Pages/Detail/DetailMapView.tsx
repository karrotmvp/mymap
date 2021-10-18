import styled from "styled-components";
import Header from "../../Components/Header";
import MapView from "../../Components/MapView";

const DetailMapView = () => {
  return (
    <Wrapper>
      <Header />
      <MapView height="100vh" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

export default DetailMapView;
