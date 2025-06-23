import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Main from "../components/main/Main";
import Filters from "../components/website/Filters";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Main />
      <Filters />
      <Footer />
    </div>
  );
};

export default Home;
