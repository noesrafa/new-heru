import MainLayout from "./layouts/MainLayout";
import Chats from "./pages/Chats";

function App() {
  return (
    <MainLayout>
      <div className="p-3">
        <input
          type="text"
          className="w-full px-5 py-3 rounded-lg bg-neutral-400/10 -mt-2"
          placeholder="Buscar en conversaciones"
        />
      </div>
      <hr />
      <Chats />
    </MainLayout>
  );
}

export default App;
