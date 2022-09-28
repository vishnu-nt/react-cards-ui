import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import "./App.scss";
import Layout from "./Components/Layout/Index";
import Card from "./Components/Card";
import Logo from "./Components/Logo";
import lockIcon from "./assets/icons/lock.svg";
import swipeIcon from "./assets/icons/swipe.svg";

const PageTitleContainer = styled.div`
  @media (max-width: 991px) {
    display: none;
  }
  line-height: 1.2;
  max-width: 60%;
  h1 {
    font-size: 4rem;
    font-weight: 700;
  }
  p {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  background-color: #300e7b;
  flex: 1;
  height: 100%;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const DetailContainer = styled.div`
  text-align: center;
  width: 100%;
  margin: 1.5rem auto;
  @media (min-width: 768px) {
    padding: 0 2rem;
    display: flex;
  }
  @media (min-width: 992px) {
    width: 30%;
    padding: 2rem;
    display: block;
    margin: 0;
  }
  .card {
    flex: 1 0 0;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  overflow: auto;
  padding: 0 1rem 1rem;
  @media (min-width: 992px) {
    display: block;
  }
`;

const Container = styled.div`
  min-height: calc(100vh - 3rem);
  padding: 1.5rem 0 1.5rem 1.5rem;
  flex-direction: column;
  flex: 1;
  @media (min-width: 992px) {
    padding: 1.5rem;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(242, 245, 248, 0.96) 0%,
    rgba(242, 245, 248, 0.02) 100%
  );
  border-radius: 1rem 0 0 1rem;
  @media (min-width: 992px) {
    width: 30%;
    padding: 0 1rem;
    border-radius: 2rem;
    background: linear-gradient(
      180deg,
      rgba(242, 245, 248, 0.96) 0%,
      rgba(242, 245, 248, 0.02) 100%
    );
  }
`;

const GestureContainer = styled.div`
  right: 1.5rem;
  bottom: -2.25rem;
`;

function App() {
  const isMobileOrTablet =
    navigator.userAgentData.mobile ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const [cards, setCards] = useState({ build: [], buy: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSwipeGesture, setShowSwipeGesture] = useState(isMobileOrTablet);

  /**
   * Fetches all cards on home page. Called on mount of `App`
   * @returns {Void}
   */
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://example.com/build-buy/cards");
      const data = await res.json();
      setCards(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetches and sets the selectedCard state.
   * This function is called on mouse over and click of the card
   * @param {String} url Id of the card
   * @param {Boolean} fromCardClick True if the function is caled from click event of the card
   * @returns {Void}
   */
  const fetchCard = async (url, fromCardClick) => {
    if (isMobileOrTablet && !fromCardClick) {
      // No need of API call on hover if user is using mobile device.
      return;
    }
    try {
      setIsLoading(true);
      setShowSwipeGesture(false); // Hide gesture after first card is selected
      const res = await fetch(`https://example.com/cards/${url}`);
      const data = await res.json();
      setSelectedCard({ ...data, id: url });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error);
    }
  };

  return (
    <Layout className="App">
      <PageTitleContainer>
        <h1 className="m-0">
          Power of Build.
          <br /> Speed of Buy.
        </h1>
        <p className="my-xl color-grey">
          All software comes with the{" "}
          <span className="color-dark font-bold">“build vs buy”</span> tradeoff.
          Our goal at SuperTokens is to minimise those tradeoffs and give you
          the best of both worlds.{" "}
        </p>
      </PageTitleContainer>
      <Container className="bg-theme flex rounded">
        <Content className="flex items-center justify-between w-full">
          <CardContainer className="relative">
            <h2 className="padding-lg m-0">If you build yourself</h2>
            <CardWrapper>
              {cards.build.map((card) => (
                <Card
                  description={card.title}
                  key={card.id}
                  isSelected={selectedCard?.id === card.id}
                  theme="blue"
                  iconUrl={lockIcon}
                  onMouseOver={() => fetchCard(card.id)}
                  onClick={() => fetchCard(card.id, true)}
                  onMouseLeave={() => {
                    if (!isMobileOrTablet) {
                      setSelectedCard(null);
                    }
                  }}
                />
              ))}
            </CardWrapper>
            {showSwipeGesture && (
              <GestureContainer className="absolute flex items-center color-light">
                <img src={swipeIcon} className="swipe-icon" alt="" />
                <span className="ml-sm">Swipe</span>
              </GestureContainer>
            )}
          </CardContainer>
          <DetailContainer className="items-center">
            <Logo
              isLoading={isLoading}
              className={isLoading ? "App-logo" : ""}
            />
            {selectedCard && (
              <Card
                className="ml-1 sm:ml-0"
                title={selectedCard.detailTitle}
                description={selectedCard.detailBody}
              />
            )}
          </DetailContainer>
          <CardContainer>
            <h2 className="padding-lg m-0">If you buy</h2>
            <CardWrapper>
              {cards.buy.map((card) => (
                <Card
                  description={card.title}
                  isSelected={selectedCard?.id === card.id}
                  key={card.id}
                  theme="yellow"
                  iconUrl={lockIcon}
                  onMouseOver={() => fetchCard(card.id)}
                  onClick={() => fetchCard(card.id, true)}
                  onMouseLeave={() => {
                    if (!isMobileOrTablet) {
                      setSelectedCard(null);
                    }
                  }}
                />
              ))}
            </CardWrapper>
          </CardContainer>
        </Content>
        <footer className="color-light text-center my-lg app-footer">
          {isMobileOrTablet ? (
            <span>👋 Pssttt.... Click the cards above</span>
          ) : (
            <span>👋 Pssttt.... hover over the cards above</span>
          )}
        </footer>
      </Container>
    </Layout>
  );
}

export default App;
