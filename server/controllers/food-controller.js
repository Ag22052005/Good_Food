const db = require("../db");
const foodDisplay=  async (req, res) => {
  try {
    const coll = await db.db.collection("food_items").find({}).toArray();
    // console.log(coll)
    res.status(200).json({ foodItems: coll });
  } catch (error) {
    console.log(error);
    res.status(504).json(error);
  }
}

const  foodCategory = async (req, res) => {
  try {
    const coll = await db.db.collection("foodCategory").find({}).toArray();
    // console.log(coll)
    res.status(200).json({ foodCategory: coll });
  } catch (error) {
    console.log(error);
    res.status(504).json(error);
  }
}
module.exports = {foodDisplay,foodCategory}
