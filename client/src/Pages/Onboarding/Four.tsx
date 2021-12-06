/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useGetRegion } from "../../api/region";
import { mini } from "../../App";
import { Close, LogoTypo, Plus, SearchClose } from "../../assets";
import Header from "../../Components/Header";
import { RegionId } from "../../Shared/atom";
import {
  ButtonFooter,
  input,
  SubmitBtn,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";

const Four = () => {
  const history = useHistory();

  const regionId = useRecoilValue(RegionId);

  let submitFlag = false;

  const submitCheck = () => {
    if (submitFlag) {
      return submitFlag;
    } else {
      submitFlag = true;
      return false;
    }
  };

  const handleSubmit = async () => {
    if (submitCheck()) return;
    history.push(`/onboarding/finish/four`);
  };

  const { data: regionName } = useGetRegion(regionId);

  const [inputList, setInputList] = useState<string[]>([""]);

  const handleAddInput = () => {
    setInputList([...inputList, ""]);
  };

  useEffect(() => {
    console.log("inputList", inputList);
  }, [inputList]);

  return (
    <Wrapper>
      <Header>
        <Close className="left-icon" onClick={() => mini.close()} />
        <LogoTypo />
      </Header>

      <Title
        style={{ fontSize: "1.9rem", marginTop: "2.3rem", lineHeight: "160%" }}
      >
        {`${regionName} 주민 추천!
꼭 가봐야 하는 ${regionName} 가게를 
알려주세요.`}
      </Title>

      <div className="inputs">
        {inputList.map((input, i) => (
          <CustomInput {...{ i, input, regionName, inputList, setInputList }} />
        ))}
      </div>

      <div className="add-button" onClick={handleAddInput}>
        <Plus className="add-icon" />더 추천하고 싶어요
      </div>

      <ButtonFooter>
        <SubmitBtn
          onClick={() => {
            !(inputList.length === 0 && inputList[0] === "") && handleSubmit();
          }}
          $disabled={inputList.length === 1 && inputList[0] === ""}
        >
          다 적었어요
        </SubmitBtn>
      </ButtonFooter>
    </Wrapper>
  );
};

const CustomInput = ({
  i,
  input,
  regionName,
  inputList,
  setInputList,
}: {
  i: number;
  input: string;
  regionName: string | undefined;
  inputList: string[];
  setInputList: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputs = [
      ...inputList.slice(0, i),
      e.target.value,
      ...inputList.slice(i + 1, inputList.length),
    ];
    setInputList(newInputs);
  };

  const removeInput = () => {
    if (inputList.length === 1) {
      setInputList([""]);
    } else {
      const newInputs = [
        ...inputList.slice(0, i),
        ...inputList.slice(i + 1, inputList.length),
      ];
      setInputList(newInputs);
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs[i].focus();
  }, []);

  return (
    <div className="custom-input">
      <Input
        className="input"
        onInput={handleInput}
        value={input}
        placeholder={`추천하는 ${regionName} 가게 이름을 적어주세요.`}
        onClick={() => Mixpanel.track("온보딩A - 텍스트박스 클릭")}
      />
      <SearchClose className="search-close" onClick={removeInput} />
    </div>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  background-color: #fff;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 10rem;
  overflow-y: scroll;
  .inputs {
    margin-top: 3rem;
    .custom-input {
      position: relative;
      .search-close {
        position: absolute;
        top: 0.3rem;
        right: 0.2rem;
        fill: ${theme.color.gray2};
      }
    }
  }
  .add-button {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 1rem;
    height: 5.2rem;
    border: 0.1rem dashed ${theme.color.gray4};
    font-size: 1.5rem;
    line-height: 180%;
    color: ${theme.color.gray6};
    background-color: ${theme.color.gray1};
    .add-icon {
      fill: ${theme.color.gray6};
    }
  }
`;

const Input = styled.input<{ $error?: boolean }>`
  ${input};
  padding-right: 5rem;
  height: 5.2rem;
  background-color: ${theme.color.gray1};
  color: ${theme.color.black};
  margin-bottom: 1rem;
`;

export default Four;
