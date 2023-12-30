const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;
const uri = "mongodb://localhost:27017";
const cors = require('cors');
app.use(cors());

app.get('/api/restaurants', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("restaurantsDirectory");
    const restaurants = database.collection("restaurants");

    const query = {}; // 您的查询条件
    const restaurantList = await restaurants.find(query).toArray();

    res.json(restaurantList);
  } catch (e) {
    res.status(500).send("Error fetching restaurants: " + e.message);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
