import { PlaylistGenerator } from "./components/PlaylistGenerator";
import { Randy } from "./components/Randy";

function App() {
  return (
    <div className="flex flex-col items-center">
      <Randy />
      <h1 className="text-5xl font-semibold font-mono">Randy Mcsongface</h1>
      <PlaylistGenerator />
    </div>
  );
}

export default App;
