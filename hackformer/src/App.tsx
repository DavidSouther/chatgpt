import { Chat } from "./Chat";
import { Credentials } from "./Credentials";

function App() {
  return (
    <>
      <header className="fluid">
        <nav>
          <h1>Hackformer</h1>
          <Credentials />
        </nav>
      </header>
      <main>
        <article>
          <Chat />
        </article>
      </main>
    </>
  );
}

export default App;
