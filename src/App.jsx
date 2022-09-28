import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import "./App.scss";
import Layout from "./Components/Layout/Index";
import Card from "./Components/Card";
import Logo from "./Components/Logo";
import swipeIcon from "./assets/icons/swipe.svg";
import lockIcon from "./assets/icons/lock.svg";
import caseIcon from "./assets/icons/briefcase.svg";
import dbIcon from "./assets/icons/db.svg";
import pricetagIcon from "./assets/icons/pricetag.svg";
import settingsIcon from "./assets/icons/settings.svg";
import timeIcon from "./assets/icons/time.svg";
import unlockIcon from "./assets/icons/unlock.svg";

const icons = [lockIcon, caseIcon, dbIcon, pricetagIcon, settingsIcon, timeIcon, unlockIcon];

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
    flex: 0 1 100%;
    padding: 0 1rem;
    display: flex;
  }
  @media (min-width: 992px) {
    width: 30%;
    padding: 1rem;
    display: block;
    margin: 0;
  }
  .card {
    @media (min-width: 768px) {
      width: calc(100% - 1.33rem - 133px);
    }
    @media (min-width: 992px) {
      flex: 1 0 0;
      width: auto;
      margin-top: 133px;
      position: relative;
      top: 133px;
    }
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
  min-height: calc(100vh - 6rem);
  padding: 3rem 0 3rem 3rem;
  flex-direction: column;
  flex: 1;
  @media (min-width: 992px) {
    padding: 3rem;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(242, 245, 248, 0.96) 0%,
    rgba(242, 245, 248, 0.02) 100%
  );
  border-radius: 1.33rem 0 0 1.33rem;
  @media (min-width: 992px) {
    width: 30%;
    flex: 1 0 30%;
    padding: 0 1rem;
    border-radius: 1.33rem;
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
        <Content className="flex items-center justify-between w-full relative">
          <CardContainer className="relative">
            <h2 className="padding-lg m-0">If you build yourself</h2>
            <CardWrapper>
              {cards.build.map((card, index) => (
                <Card
                  description={card.title}
                  key={card.id}
                  isSelected={selectedCard?.id === card.id}
                  theme="blue"
                  iconUrl={icons[index]}
                  onMouseOver={() => fetchCard(card.id)}
                  onClick={() => fetchCard(card.id, true)}
                  onMouseLeave={() => {
                    if (!isMobileOrTablet) {
                      // setSelectedCard(null);
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
          <DetailContainer className="items-center relative">
            <Logo
              isLoading={isLoading}
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
              {cards.buy.map((card, index) => (
                <Card
                  description={card.title}
                  isSelected={selectedCard?.id === card.id}
                  iconUrl={icons[index]}
                  key={card.id}
                  theme="yellow"
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
