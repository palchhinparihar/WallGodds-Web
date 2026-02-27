import { useRef, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// LIGHT-ICONS
import MobileIcon_light from "./GallaryAssets/mobile-light.svg";
import TabletIcon_light from "./GallaryAssets/tablet-light.svg";
import LaptopIcon_light from "./GallaryAssets/laptop-light.svg";
// DARK-ICONS
import MobileIcon_dark from "./GallaryAssets/mobile-dark.svg";
import TabletIcon_dark from "./GallaryAssets/tablet-dark.svg";
import LaptopIcon_dark from "./GallaryAssets/laptop-dark.svg";


import Abstract from "./categorieItems/Abstract.svg";
import Nature from "./categorieItems/Nature.svg";
import Anime from "./categorieItems/Anime.svg";
import Art from "./categorieItems/Art.svg";
import Movies from "./categorieItems/Movies.svg";
import Vehicles from "./categorieItems/Vehicles.svg";
import Sports from "./categorieItems/Sports.svg";
import Games from "./categorieItems/Games.svg";
import Travel from "./categorieItems/Travel.svg";
import Spiritual from "./categorieItems/Spiritual.svg";
import Music from "./categorieItems/Music.svg";
import AIGen from "./categorieItems/AIGen.svg";

import Mobile from "./MobileSection/Mobile";
import Tablet from "./TabletSection/Tablet";
import Desktop from "./DesktopSection/Desktop";

import NavBar from "../CommonModule/NavBarModule/NavBar";
import Footer from "../CommonModule/FooterModule/Footer";

import Styles from "./Gallery.module.css";

// const devices = [
//   { id: "tablet", icon: TabletIcon, route: "/gallery/tablet" },
//   { id: "desktop", icon: LaptopIcon, route: "/gallery/desktop" },
//   { id: "mobile", icon: MobileIcon, route: "/gallery/mobile" },
// ];

const categories = [
  { title: "Abstract", image: Abstract },
  { title: "Nature", image: Nature },
  { title: "Anime", image: Anime },
  { title: "Art", image: Art },
  { title: "Movies", image: Movies },
  { title: "Vehicles", image: Vehicles },
  { title: "Sports", image: Sports },
  { title: "Gaming", image: Games },
  { title: "Travels", image: Travel },
  { title: "Spiritual", image: Spiritual },
  { title: "Music", image: Music },
  { title: "AI Gen", image: AIGen },
];

const Gallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeDevice = location.pathname.split("/").pop();

  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark-theme")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-theme"));
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const devices = [
    {
      id: "tablet",
      icon: isDark ? TabletIcon_dark : TabletIcon_light,
      route: "/gallery/tablet",
    },
    {
      id: "desktop",
      icon: isDark ? LaptopIcon_dark : LaptopIcon_light,
      route: "/gallery/desktop",
    },
    {
      id: "mobile",
      icon: isDark ? MobileIcon_dark : MobileIcon_light,
      route: "/gallery/mobile",
    },
  ];

  useEffect(() => {
    if (location.pathname === "/gallery" || location.pathname === "/gallery/") {
      navigate("/gallery/desktop", { replace: true });
    }
  }, [location.pathname, navigate]);

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Navbar Scroll Logic
  // Navbar Scroll Logic
  const navbarRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const navbarScrollPos = useRef(0);

  // Sequential Scroll Logic (Non-passive listener to control event)
  useEffect(() => {
    const handleWheelSeq = (e) => {
      // Prevent default browser scrolling
      e.preventDefault();

      const delta = e.deltaY;
      const maxScroll = 250;
      const maxContentScroll = 120;
      const scrollArea = scrollAreaRef.current;

      if (!navbarRef.current || !contentWrapperRef.current || !scrollArea) return;

      // Current State
      let currentNavPos = navbarScrollPos.current;
      let currentContentScroll = scrollArea.scrollTop;

      // Logic:
      // Scroll DOWN (delta > 0): Navbar Shrinks FIRST -> Then Content Scrolls
      // Scroll UP (delta < 0): Navbar Expands FIRST -> Then Content Scrolls Up

      const navbarShrinkSpeed = 0.8;
      const navbarExpandSpeed = 1.5; // Fast expansion
      const contentSpeed = 0.25; // Even slower content scroll

      if (delta > 0) {
        // SCROLLING DOWN
        if (currentNavPos < maxScroll) {
          // Priority 1: Shrink Navbar
          currentNavPos += delta * navbarShrinkSpeed;
          currentNavPos = Math.min(currentNavPos, maxScroll);
        } else {
          // Priority 2: Scroll Content
          scrollArea.scrollTop += delta * contentSpeed;
        }
      } else {
        // SCROLLING UP
        if (currentNavPos > 0) {
          // Priority 1: Expand Navbar immediately
          currentNavPos += delta * navbarExpandSpeed;
          currentNavPos = Math.max(currentNavPos, 0);
        } else {
          // Priority 2: Scroll Content Up (only if navbar is fully expanded)
          scrollArea.scrollTop += delta * contentSpeed;
        }
      }

      // Update Refs/State
      navbarScrollPos.current = currentNavPos;

      // Apply Animations based on new NavPos
      const progress = currentNavPos / maxScroll;
      navbarRef.current.style.setProperty("--scroll-progress", progress);

      const contentTranslate = progress * -maxContentScroll;
      contentWrapperRef.current.style.setProperty(
        "--header-margin-top",
        `${contentTranslate}px`
      );
    };

    // Attach non-passive listener to window or container
    // Attaching to window ensures we catch it everywhere (including over navbar)
    window.addEventListener("wheel", handleWheelSeq, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheelSeq);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    sliderRef.current.classList.add(Styles.grabbing);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) sliderRef.current.classList.remove(Styles.grabbing);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) sliderRef.current.classList.remove(Styles.grabbing);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <NavBar className={Styles.galleryNavbar} ref={navbarRef} />

      {/* Main Scroll Container */}
      <div className={Styles.container}>
        
        {/* Scrollable Content Wrapper */}
        <div className={Styles.contentWrapper} ref={contentWrapperRef}>
          {/* Device Selector */}
          <div className={Styles.deviceSelector}>
            {devices.map(({ id, icon: Icon, route }) => {
              const isActive = activeDevice === id;
              const isAnyActive = devices.some((d) => d.id === activeDevice);
              const shouldBlur = isAnyActive && !isActive;

              return (
                <button
                  key={id}
                  onClick={() => navigate(route)}
                  className={`${Styles.deviceBtn} ${isActive ? Styles.active : ""} ${shouldBlur ? Styles.blurred : ""}`}
                >
                  <img src={Icon} alt={id} width={34} height={34} />
                </button>
              );
            })}
          </div>

          <div className={Styles.temp}>
            {/* Categories */}
            <div
              ref={sliderRef}
              className={Styles.scrollItems}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className={Styles.categoryCard}
                  style={{ backgroundImage: `url(${cat.image})` }}
                >
                  <span className={Styles.categoryTitle}>{cat.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={Styles.galleryScrollArea} ref={scrollAreaRef}>
            {activeDevice === "mobile" && <Mobile />}
            
            <Routes>
              <Route path="desktop" element={<Desktop />} />
              <Route path="tablet" element={<Tablet />} />
            </Routes>
            
            <div className={Styles.footerWrapper}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;