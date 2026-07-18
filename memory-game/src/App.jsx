import { MainHeader } from "./components/Header.jsx";

const cardValues = [
  "🇦",
  "🇧",
  "🇨",
  "🇩",
  "🇪",
  "🇫",
  "🇬",
  "🇭",

  "🇦",
  "🇧",
  "🇨",
  "🇩",
  "🇪",
  "🇫",
  "🇬",
  "🇭",
];

function App() {
  return (
    <div className="app">
      <MainHeader score={3} moves={10} />
    </div>
  );
}

export default App;
