import Header from "../components/Header";
import Footer from "../components/Footer";
import CardList from "../components/CardList";

function Home() {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <CardList></CardList>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
