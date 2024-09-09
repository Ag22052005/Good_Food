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
      <div
        className="border mx-auto overflow-hidden Carouse-container"
      >
        <div className="d-flex justify-content-center align-items-center Carousel">
          {popular.map((food, index) => {
            return (
              index < 5 && (
                <motion.img
                  src={food.img}
                  key={index}
                  variants={ImageVarients}
                  initial={positions[postionIndex[index]]}
                  animate={positions[postionIndex[index]]}
                  transition={{ duration: 0.5 }}
                  className={`Carousel-img ${positions[postionIndex[index]]}`}
                ></motion.img>
              )
            );
          })}
        </div>
        <div
          className="m-auto d-flex justify-content-between align-items-center arrow-box"
        >
          <span
            onClick={LeftClick}
            className="fw-bolder ImageSlider-control arrow"
          >
            {"<"}
          </span>
          <span
            onClick={RightClick}
            className="fw-bolder ImageSlider-control arrow"
          >
            {">"}
          </span>
        </div>
      </div>

      {/* INPUT */}

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

      {/* Cards */}

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
                    food.name
                      .toLowerCase()
                      .includes(serach.toLowerCase().trim()) && (
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
