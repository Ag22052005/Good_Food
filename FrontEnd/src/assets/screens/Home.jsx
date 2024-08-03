import Header from "../components/Header";
import Footer from "../components/Footer";
import CardList from "../components/CardList";
import ChatBot from "./ChatBotScreen";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate()
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
      <button className="chatBot-btn" onClick={()=> navigate('/chatbot')}>
        <img className="chatBot-img"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUDsX-nhClM2AmpjnT25TF80rQzXLrew9j4w&s" alt="" />
      </button>
    </div>
  );
}

export default Home;
