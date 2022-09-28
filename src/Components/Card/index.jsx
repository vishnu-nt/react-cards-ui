import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ProgressBar = styled.div`
  width: 20%;
  height: 8px;
  background-color: ${(props) =>
    props.theme === "blue" ? "#2250F4" : "#FF8000"};
`;

const selectedCardCss = css`
  box-shadow: 0px 1px 12px rgba(255, 128, 0, 0.4);
`;

const selectedBlueCardCss = css`
  border: 1px solid #2250f4;
  background: rgba(34, 80, 244, 0.2);
`;

const selectedYellowCardCss = css`
  border: 1px solid #ff8000;
  background: rgba(255, 128, 0, 0.2);
`;

const Wrapper = styled.div`
  padding: 1rem;
  background: #fff;
  margin-bottom: 1rem;
  transition: all ease-in-out 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? props.theme === "blue"
        ? selectedBlueCardCss
        : selectedYellowCardCss
      : ""};
  :hover {
    ${selectedCardCss}
    ${(props) =>
      props.theme === "blue" ? selectedBlueCardCss : selectedYellowCardCss};
  }
  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  margin-right: 1rem;
  flex: 0 0 auto;
  width: calc(100% - 1.2rem);
  @media (min-width: 768px) {
    width: auto;
  }
  @media (min-width: 992px) {
    margin-right: 0;
  }
`;

const IconWrapper = styled.span`
  width: 32px;
  height: 32px;
  padding: 6px;
  background-color: ${(props) =>
    props.theme === "blue" ? "#2250F4" : "#FF8000"};
  border-radius: 50%;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  width: 20px;
  height: 20px;
`;

const Card = (props) => {
  return (
    <Container className={`bg-light rounded card ${props.className}`}>
      <Wrapper
        className="rounded h-full"
        role="button"
        isSelected={props.isSelected}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}
        theme={props.theme}
      >
        {props.title ? (
          <h2>{props.title}</h2>
        ) : (
          <ProgressBar className="rounded" theme={props.theme} />
        )}
        <div className="flex align-start justify-between">
          <p className="color-grey-2 text-base font-semi-bold">
            {props.description}
          </p>
          {props.iconUrl && (
            <IconWrapper theme={props.theme} className="ml-1">
              <Icon src={props.iconUrl} alt="" />
            </IconWrapper>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

Card.defaultProps = {
  className: "",
};

export default Card;
