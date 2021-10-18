import { useState } from "react";
import styled from "styled-components";
import Collection from "../Components/Collection";
import CreateButton from "../Components/CreateButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { gap, theme, WrapperWithHeaderFooter } from "../styles/theme";

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
        내 리스트
      </TabBtn>
      <TabBtn
        $isSelected={selectedTab === "others"}
        onClick={() => handleSelectedTab("others")}
      >
        저장한 리스트
      </TabBtn>
    </TabWrapper>
  );
};

const Mypage = () => {
  const [isScroll, setIsScroll] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  });

  return (
    <Wrapper>
      {isScroll && <Header className="header-scroll" title="로컬큐레이터님" />}

      <Profile>
        <div className="photo" />
        <div className="user">
          <div className="name">로컬큐레이터님</div>
          <div className="place">논현동</div>
        </div>
      </Profile>

      <Tab />

      <div className="collections">
        {new Array(20).fill(0).map((_, i) => (
          <Collection key={i} />
        ))}
      </div>

      <CreateButton />

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
      margin-top: 0.1rem;
    }
  }
`;

const Profile = styled.div`
  width: 100%;
  height: 15rem;
  background-color: ${theme.color.orange};
  margin-top: -5rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  padding-top: 4rem;
  box-sizing: border-box;
  color: ${theme.color.white};

  .photo {
    width: 5.2rem;
    height: 5.2rem;
    border-radius: 50%;
    border: 0.3rem solid ${theme.color.white};
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
      margin-top: 0.7rem;
    }
  }
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2.5rem 1.6rem;
  box-sizing: border-box;
  ${gap("0.5rem")}
  position: sticky;
  top: 5rem;
  background-color: #fff;
`;

const TabBtn = styled.div<{ $isSelected: boolean }>`
  font-size: 1.5rem;
  line-height: 120%;
  padding: 1rem 1.2rem;
  border-radius: 3rem;
  color: ${({ $isSelected }) =>
    $isSelected ? theme.color.white : theme.color.gray6};
  font-weight: ${({ $isSelected }) => $isSelected && "bold"};
  background-color: ${({ $isSelected }) => $isSelected && theme.color.orange};
`;

export default Mypage;
