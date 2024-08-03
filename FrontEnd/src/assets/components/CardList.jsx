import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

function CardList() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [serach,setSearch]  = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/foodDisplay`)
      .then((res) => {

        setFoodItems(res.data.foodItems);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_HOST_URL}/foodDisplay/category`)
      .then((res) => {
        setFoodCategory(res.data.foodCategory);
      })
      .catch((err) => console.log(err));
  }, []);
  

  return (
    <>
    <div>
    <div className="container Carousel" style={{ minWidth: "100vw" }}>
      <div id="carouselExampleFade" style={{height:'100%'}} className="carousel slide carousel-fade">
        <div className="carousel-inner h-100">
          <div
            className="carousel-item active Carousel-item h-100"
          >
            <img
              src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              alt="..."
            />
          </div>
          <div
            className="carousel-item"
          >
            <img
              src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
              className="d-block w-100"
              style={{ objectFit: "cover" }}
              alt="..."
            />
          </div>
          <div
            className="carousel-item"
          >
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
              onChange={(e)=>setSearch(e.target.value)}
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
    </div>
    <div className="container d-flex justify-content-center flex-column" style={{ minWidth: "98vw" }}>
      {foodCategory.map((category) => {
        return (
          <div key={category._id}>
            <h4 className="m-4" style={{ borderTop: "2px solid black" }}>
              {category.CategoryName}
            </h4>
            <div className="d-flex flex-wrap CardList-cardsContainer">
              {foodItems.map((food) => {
                return (
                  food.CategoryName === category.CategoryName && food.name.toLowerCase().includes(serach) &&(
                    <Card key={food._id} food={food}></Card>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
      <br />
    </div>
    </>
  );
}

export default CardList;
