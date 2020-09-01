const x = require("express");
const y = require("mongodb");
const c = require("cors");
const b = require("body-parser");

const a = x();
const MongoClient = y.MongoClient;
const uri = "mongodb+srv://Sagar_S_Bhat:perman@14@cluster0.upgy9.mongodb.net/edurekainternship?retryWrites=true&w=majority";
let db;
const p = 8900;

a.use(c());
a.use(b.urlencoded({ extended: true }));
a.use(b.json());

//Api for location

a.get("/city/:id", (req, res) => {
  var q = { city: parseInt(req.params.id) };
  db.collection("city")
    .find(q)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/meals/:id", (req, res) => {
  var q = { mealtype: parseInt(req.params.id) };
  db.collection("meals")
    .find(q)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/restaurants/:id", (req, res) => {
  var q = { _id: req.params.id };
  db.collection("restaurant")
    .find(q)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/rest/:cityid", (req, res) => {
  var q = { city: req.params.cityid };
  db.collection("restaurant")
    .find(q)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//get order
a.get("/orderlist", (req, res) => {
  db.collection("orders")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.delete("/orderdelete", (req, res) => {
  db.collection("orders").remove({ _id: req.body._id }, (err, result) => {
    if (err) throw err;
    res.send("Data Deleted");
  });
});

//place order
a.post("/orders", (req, res) => {
  var data = {
    _id: req.body._id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    person: req.body.person,
    restid: req.body.restid,
  };
  db.collection("orders").insert(data, (err, result) => {
    if (err) throw err;
    res.send("Data Updated");
  });
});

a.get("/restauranthome", (req, res) => {
  var q = {};
  if (req.query.city && req.query.meals) {
    q = { city: req.query.city, "type.mealtype": req.query.meals };
  } else if (req.query.city) {
    q = { city: req.query.city };
  } else if (req.query.meals) {
    q = { "type.mealtype": req.query.meals };
  }
  db.collection("restaurant")
    .find(q)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/restaurantlist/:id/:meals", (req, res) => {
  var q = {};
  var s = { cost: 1 };
  if (
    req.params.id &&
    req.params.meals &&
    req.query.cuisine &&
    req.query.lcost &&
    req.query.hcost &&
    req.query.sort
  ) {
    q = {
      city: req.params.id,
      "type.mealtype": req.params.meals,
      "Cuisine.cuisine": req.query.cuisine,
      cost: { $gt: parseInt(req.query.lcost), $lt: parseInt(req.query.hcost) },
    };
    s = { cost: parseInt(req.query.sort) };
  } else if (
    req.params.id &&
    req.params.meals &&
    req.query.cuisine &&
    req.query.lcost &&
    req.query.hcost
  ) {
    q = {
      city: req.params.id,
      "type.mealtype": req.params.meals,
      "Cuisine.cuisine": req.query.cuisine,
      cost: { $gt: parseInt(req.query.lcost), $lt: parseInt(req.query.hcost) },
    };
  } else if (
    req.params.id &&
    req.params.meals &&
    req.query.cuisine &&
    req.query.sort
  ) {
    q = {
      city: req.params.id,
      "type.mealtype": req.params.meals,
      "Cuisine.cuisine": req.query.cuisine,
    };
    s = { cost: parseInt(req.query.sort) };
  } else if (
    req.params.id &&
    req.params.meals &&
    req.query.lcost &&
    req.query.hcost &&
    req.query.sort
  ) {
    q = {
      city: req.params.id,
      "type.mealtype": req.params.meals,
      cost: { $gt: parseInt(req.query.lcost), $lt: parseInt(req.query.hcost) },
    };
    s = { cost: parseInt(req.query.sort) };
  } else if (req.params.id && req.params.meals && req.query.cuisine) {
    q = {
      city: req.params.id,
      "type.mealtype": req.params.meals,
      "Cuisine.cuisine": req.query.cuisine,
    };
  } else if (
    req.params.id &&
    req.params.meals &&
    req.query.lcost &&
    req.query.hcost
  ) {
    q = {
      city: req.params.id,
      "type.mealtype": req.params.meals,
      cost: { $gt: parseInt(req.query.lcost), $lt: parseInt(req.query.hcost) },
    };
  } else if (req.params.id && req.params.meals && req.query.sort) {
    q = { city: req.params.id, "type.mealtype": req.params.meals };
    s = { cost: parseInt(req.query.sort) };
  } else {
    q = { city: req.params.id, "type.mealtype": req.params.meals };
  }
  db.collection("restaurant")
    .find(q)
    .sort(s)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/restaurantcity/:cityname", (req, res) => {
  var c =
    req.params.cityname.charAt(0).toUpperCase() +
    req.params.cityname.slice(1).toLowerCase();
  var q = { city_name: c };
  db.collection("restaurant")
    .find(q)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/restaurant", (req, res) => {
  db.collection("restaurant")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/meals", (req, res) => {
  db.collection("meals")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/cities", (req, res) => {
  var q = { city: req.params.id };
  db.collection("city")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.get("/cuisine", (req, res) => {
  db.collection("cusine")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

a.post("/restaurantadd", (req, res) => {
  db.collection("restaurant").insert(req.body, (err, result) => {
    if (err) throw err;
    res.send("Data Added");
  });
});

a.delete("/restaurantdelete", (req, res) => {
  db.collection("restaurant").remove({ _id: req.body._id }, (err, result) => {
    if (err) throw err;
    res.send("Data Deleted");
  });
});

//Post orders

a.put("/restaurantupdate", (req, res) => {
  db.collection("restaurant").update(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        locality: req.body.locality,
        city_name: req.body.city_name,
        city: req.body.city,
        area: req.body.area,
        address: req.body.address,
        thumb: req.body.thumb,
        cost: req.body.cost,
        contact_number: req.body.contact_number,
        type: req.body.type,
        Cuisine: req.body.Cuisine,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("Data Updated");
    }
  );
});

MongoClient.connect(uri,{ useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  db = client.db("edurekainternship");
  a.listen(p, (err) => {
    if (err) throw err;
    console.log(`Server Running on port no ${p}`);
  });
});
