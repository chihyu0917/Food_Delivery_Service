const express = require('express');
// const { MongoClient } = require('mongodb');
const { MongoClient, ObjectId } = require('mongodb');


const app = express();
const port = 3001;
const uri = "mongodb://localhost:27017";
const cors = require('cors');
app.use(cors());
app.use(express.json());

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

app.post('/api/restaurants/:id/like', async (req, res) => {
  const { id } = req.params; // 这是URL中传递的自定义id
  const { like } = req.body;

  console.log("ID received:", id); // 调试输出
  console.log("Like received:", like); // 调试输出

  const client = new MongoClient(uri);

  try {
    const database = client.db("restaurantsDirectory");
    const restaurants = database.collection("restaurants");

    // 如果 id 是数字类型
    const result = await restaurants.updateOne(
      { id: id }, 
      { $set: { like: like.toString() } }
    );

    console.log("Update result:", result); // 调试输出

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: 'Restaurant not found with the provided id.' });
    }

    res.send({ message: 'Restaurant like status updated successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating the like status: ' + error.message });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
