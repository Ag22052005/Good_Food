import { useEffect, useContext, useState } from "react";
import Card from "./Card";
import axios from "axios";
import {
  useInView,
  useAnimation,
  motion,
  easeInOut,
  addScaleCorrector,
} from "framer-motion";
import { FoodCategoryContext, FoodContext } from "../../Context/foodContext";

function CardList() {
  const { foodItems } = useContext(FoodContext);
  const { foodCategory } = useContext(FoodCategoryContext);
  const [serach, setSearch] = useState("");
  const [postionIndex, setPositionIndex] = useState([0, 1, 2, 3, 4]);
  const popular = foodItems.filter(
    (food, index) =>
      food.CategoryName == "Pizza" ||
      (food.CategoryName == "Starter" && index < 10)
  );
  useEffect(() => {}, []);

  const positions = ["left", "left1", "center", "right1", "right"];

  const ImageVarients = {
    center: {
      x: "0%",
      scale: 1,
      zIndex: 5,
    },
    left1: {
      x: "-70%",
      scale: 0.7,
      zIndex: 3,
    },
    left: {
      x: "-100%",
      scale: 0.5,
      zIndex: 1,
    },
    right: {
      x: "100%",
      scale: 0.5,
      zIndex: 1,
    },
    right1: {
      x: "70%",
      scale: 0.7,
      zIndex: 3,
    },
  };

  const LeftClick = () => {
    setPositionIndex((prev) => prev.map((value) => (value + 4) % 5));
  };
  const RightClick = () => {
    setPositionIndex((prev) => prev.map((value) => (value + 1) % 5));
  };

  return (
    <>
      {/* {<div>
        <div className="container Carousel" style={{ minWidth: "100vw" }}>
          <div
            id="carouselExampleFade"
            style={{ height: "100%" }}
            className="carousel slide carousel-fade"
          >
            <div className="carousel-inner h-100">
              <div className="carousel-item active Carousel-item h-100">
                <img
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
                  className="d-block w-100"
                  style={{ objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="d-block w-100"
                  alt="..."
                />
              </div>

              <div className="searchItem">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  value={serach}
                  placeholder="Search Here"
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>} */}

      <div
        className="border mx-auto overflow-hidden"
        style={{ backgroundColor: "#e6e3e3", width: "98%", height: "25rem" }}
      >
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ width: "100%", height: "22rem" }}
        >
          {popular.map((food, index) => {
            return (
              index < 5 && (
                <motion.img
                  src={food.img}
                  key={index}
                  variants={ImageVarients}
                  initial={positions[postionIndex[index]]}
                  animate={positions[postionIndex[index]]}
                  className=""
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "30%",
                    position: "absolute",
                    borderRadius: "6%",
                  }}
                ></motion.img>
              )
            );
          })}
        </div>
        <div
          className="m-auto d-flex justify-content-between align-items-center"
          style={{
            position: "relative",
            top: "-46%",
            zIndex: 12,
            width: "30%",
          }}
        >
          <span
            onClick={LeftClick}
            style={{ fontSize: "2rem", color: "#0f0f0f" }}
            className="fw-bolder ImageSlider-control"
          >
            {"<"}
          </span>
          <span
            onClick={RightClick}
            style={{ fontSize: "2rem", color: "#0f0f0f" }}
            className="fw-bolder ImageSlider-control"
          >
            {">"}
          </span>
        </div>
      </div>
      <div className="searchItem container mt-4">
        <input
          className="form-control mr-sm-2"
          type="search"
          value={serach}
          placeholder="Search Here"
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
      </div>
      <motion.div
        className="container d-flex justify-content-center flex-column"
        style={{ minWidth: "98vw" }}
      >
        {foodCategory.map((category) => {
          return (
            <div key={category._id}>
              <h4 className="m-4" style={{ borderTop: "2px solid black" }}>
                {category.CategoryName}
              </h4>
              <div className="d-flex flex-wrap CardList-cardsContainer">
                {foodItems.map((food) => {
                  return (
                    food.CategoryName === category.CategoryName &&
                    food.name.toLowerCase().includes(serach) && (
                      <Card key={food._id} food={food}></Card>
                    )
                  );
                })}
              </div>
            </div>
          );
        })}
        <br />
      </motion.div>
    </>
  );
}

export default CardList;
