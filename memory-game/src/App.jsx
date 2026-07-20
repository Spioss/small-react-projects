import { useEffect, useState } from "react";
import { Card } from "./components/Card.jsx";
import { MainHeader } from "./components/Header.jsx";
import { WinToast } from "./components/WinToast.jsx";

const cardValues = [
  "🇸🇰",
  "🇨🇿",
  "🇺🇸",
  "🇮🇹",
  "🇯🇵",
  "🇨🇺",
  "🇧🇷",
  "🇵🇹",

  "🇸🇰",
  "🇨🇿",
  "🇺🇸",
  "🇮🇹",
  "🇯🇵",
  "🇨🇺",
  "🇧🇷",
  "🇵🇹",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);


  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      setShowWinModal(true);
    }
  }, [matchedCards, cards]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initalizeGame = () => {
    // SHUFFLE CARDS
    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);

    // reset everything
    setShowWinModal(false);
    setScore(0);
    setMoves(0);
    setMatchedCards([]);
    setFlippedCards([]);
  };

  useEffect(() => {
    initalizeGame();
  }, []);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // if two cards are flipped
    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]]; // id of first flipped card

      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          setMoves((prev) => prev + 1);
          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }),
          );

          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });

          setCards(flippedBackCards);
          setFlippedCards([]);
        }, 1000);

        setMoves((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="app">
      <MainHeader score={score} moves={moves} onReset={initalizeGame} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>

      {showWinModal && (
        <WinToast moves={moves} onPlayAgain={initalizeGame} />
      )}
    </div>
  );
}

export default App;
