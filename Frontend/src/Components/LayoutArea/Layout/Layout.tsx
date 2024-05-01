import "./Layout.css";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import { useState, useEffect } from "react";
import { RoleModel } from "../../../Models/RoleModel";

function Layout(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);

  //   get user from state to change layout accordingly
  const user = useSelector<AppState, UserModel>((state) => state.user);
  let needToDeploy = true;

  // Check if the modal needs to be displayed
  useEffect(() => {
    const storedNeedToDeploy = localStorage.getItem("needToDeploy");
    if (storedNeedToDeploy !== null)
      needToDeploy = JSON.parse(storedNeedToDeploy);
  }, []);

  // Display modal for certain user role and deployment status
  useEffect(() => {
    if (user?.roleId === RoleModel.User && needToDeploy) {
      const timer = setTimeout(() => {
        setIsModalVisible(true);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [user, needToDeploy]);

  // Function to close the modal
  function closeModal(): void {
    setIsModalVisible(false);
    needToDeploy = false;
    localStorage.setItem("needToDeploy", JSON.stringify(false));
  }

  if (user) {
    return (
      <div className="Layout">
        <header>
          <Header />
        </header>
        <main>
          <Routing />

          {/* Modal */}
          <div className={`backdrop ${isModalVisible ? "" : "hidden"}`}>
            <div className="notificationCard">
              <p className="notificationHeading">
                Unlock Vacation Awesomeness!
              </p>
              <svg className="bellIcon" viewBox="0 0 448 512">
                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path>
              </svg>
              <p className="notificationPara">
                Get travel tips, deals & share itineraries to your email!
              </p>
              <div className="buttonContainer">
                <button onClick={closeModal} className="AllowBtn">
                  Allow
                </button>
                <button onClick={closeModal} className="NotnowBtn">
                  Not now
                </button>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <Menu />
        </footer>
      </div>
    );
  }
  // If user is not logged in, render only the Routing component for a different layout.
  return (
    <div className="Layout-login">
      <Routing />
    </div>
  );
}

export default Layout;
