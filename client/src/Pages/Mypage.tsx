import { useState } from "react";
import styled from "styled-components";
import Collection from "../Components/Collection";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { gap, WrapperWithHeaderFooter } from "../styles/theme";

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState("my");
  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <TabWrapper>
      <TabBtn
        $isSelected={selectedTab === "my"}
        onClick={() => handleSelectedTab("my")}
      >
        나의 컬렉션
      </TabBtn>
      <TabBtn
        $isSelected={selectedTab === "others"}
        onClick={() => handleSelectedTab("others")}
      >
        남의 컬렉션
      </TabBtn>
    </TabWrapper>
  );
};

const Mypage = () => {
  return (
    <Wrapper>
      <Header title="마이페이지" />

      <Profile>
        <div className="photo" />
        <div className="user">
          <div className="name">미니</div>
          <div className="place">논현동</div>
        </div>
      </Profile>

      <Tab />

      <div className="collections">
        {new Array(20).fill(0).map((_, i) => (
          <Collection />
        ))}
      </div>

      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeaderFooter};
  .collections {
    margin-left: 2rem;
    padding-bottom: 2rem;
    & > div {
      margin-top: 2.9rem;
    }
  }
`;

const Profile = styled.div`
  width: 100%;
  height: 13.1rem;
  background-color: lightgray;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-sizing: border-box;

  .photo {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    background-color: gray;
  }
  .user {
    margin-left: 1.2rem;
    .name {
      font-size: 1.8rem;
      line-height: 115%;
    }
    .place {
      font-size: 1.5rem;
      line-height: 115%;
      color: gray;
      margin-top: 0.7rem;
    }
  }
`;

const TabWrapper = styled.div`
  width: 100%;
  height: 6.5rem;
  display: flex;
  align-items: center;
  padding: 0 2.1rem;
  box-sizing: border-box;
  ${gap("1.8rem")}
  border-bottom: 0.1rem solid lightgray;
  position: sticky;
  top: 7rem;
  background-color: #fff;
`;

const TabBtn = styled.div<{ $isSelected: boolean }>`
  font-size: 2.1rem;
  line-height: 120%;
  font-weight: ${({ $isSelected }) => $isSelected && "bold"};
`;

export default Mypage;
