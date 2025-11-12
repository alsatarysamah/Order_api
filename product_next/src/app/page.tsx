import Item from "@components/Item/Item";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-auto scroll-smooth">
      <Header />
      <main className="flex flex-col flex-grow text-center mx-5">
        <Item />
      </main>
      <Footer />
    </div>
  );
}
