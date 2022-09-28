import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  min-height: calc(100vh - 3rem);
  padding: 1rem;
  @media (min-width: 992px) {
    padding: 4rem;
  }
  @media (min-width: 1200px) {
    padding: 5rem;
  }
`;

const CircleLeft = styled.div`
  background: rgba(214, 109, 203, 0.6);
  filter: blur(100px);
  width: 50%;
  z-index: -1;
  ${(props) => ({ ...props.css })}
`;

const CircleRight = styled.div`
  background: rgba(71, 90, 255, 0.6);
  filter: blur(100px);
  width: 50%;
  right: 0;
  z-index: -1;
  ${(props) => ({ ...props.css })}
`;

const Layout = (props) => {
  return (
    <Container className="relative">
      <CircleLeft
        className="absolute"
        css={{ background: "rgba(214, 109, 203, 0.6)", top: 0, height: 300 }}
      />
      <CircleRight
        className="absolute"
        css={{ background: "rgba(71, 90, 255, 0.6)", top: 0, height: 300 }}
      />
      <CircleLeft
        className="absolute"
        css={{ background: "rgba(214, 109, 203, 0.6)", bottom: 0, height: 700 }}
      />
      <CircleRight
        className="absolute"
        css={{ background: "rgba(71, 90, 255, 0.6)", bottom: 0, height: 700 }}
      />
      <div>{props.children}</div>
    </Container>
  );
};

export default Layout;
