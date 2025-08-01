import Info from "../../components/dashoard/Info";
import totalOffers from "../../assets/images/dashboard/main/totalOffers.svg";
import totalUsers from "../../assets/images/dashboard/main/totalUsers.svg";
import totalComments from "../../assets/images/dashboard/main/totalComments.svg";
import totalReports from "../../assets/images/dashboard/main/totalReports.svg";
import totalLikes from "../../assets/images/dashboard/main/totalLikes.svg";
import views from "../../assets/images/dashboard/main/totalVector (4).svg";
import Topbar from "../../components/dashoard/Topbar";
const Home = () => {
  return (
    <div>
      <Topbar />
      <div className="flex flex-col gap-3 ">
        <div className="flex-between gap-3">
          <Info
            img={totalOffers}
            link="/"
            number="2"
            title="ابلاغات"
            type="إعلان"
          />
          <Info
            img={totalUsers}
            link="/"
            number="2"
            title="ابلاغات"
            type="إعلان"
          />
          <Info
            img={totalComments}
            link="/"
            number="2"
            title="ابلاغات"
            type="إعلان"
          />
          <Info
            img={totalReports}
            link="/"
            number="2"
            title="ابلاغات"
            type="إعلان"
          />
        </div>
        <div className="flex flex-col gap-3 items-end ">
          <Info
            img={totalLikes}
            link="/"
            number="2"
            title="ابلاغات"
            type="إعلان"
          />
          <Info img={views} link="/" number="2" title="ابلاغات" type="إعلان" />
        </div>
      </div>
    </div>
  );
};

export default Home;
