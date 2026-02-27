import NavBar from "../CommonModule/NavBarModule/NavBar";
import Footer from "../CommonModule/FooterModule/Footer";
import Styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={Styles.navbarWrapper}>
                <NavBar />
            </div>
            <div className={Styles.container}>
                <div className={Styles.temp}>
                    <p className={Styles.first}>
                        <span className={Styles.desktopText}>
                            This section is being designed and will be available
                            for contributors soon
                        </span>
                        <span className={Styles.mobileText}>
                            This site is currently not responsive on mobile
                            devices
                        </span>
                    </p>
                    <p className={Styles.second}>
                        <span className={Styles.desktopText}>
                            Keep an eye on{" "}
                            <a
                                href="https://github.com/WallGodds/WallGodds-Web/issues"
                                target="_blank"
                                rel="noopener noreferrer">
                                Github
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://discord.gg/kTQ5KWANp8"
                                target="_blank"
                                rel="noopener noreferrer">
                                Discord
                            </a>{" "}
                            for updates and announcements
                        </span>
                        <span className={Styles.mobileText}>
                            Contributors can expect mobile responsiveness issues
                            to be available by the second week of February
                        </span>
                    </p>
                </div>
                <div className={Styles.footerWrapper}>
                    <Footer />
                </div>
                {/*             
                <button 
                    onClick={() => navigate("/signin")}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px"
                    }}
                >
                    Sign In (Test)
                </button> */}
            </div>
        </>
    );
};

export default Home;