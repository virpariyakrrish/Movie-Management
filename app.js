import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/movieDB").then(() => {
    console.log("MongoDB Connected");
}).catch(() => {
    console.log("Database Error");
});

// Schema

const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    director: String
});

//Add schema in db

const movie = mongoose.model("movie", movieSchema);

app.get("/", (req, res) => {
    res.json({
        msg: "Home Page"
    });
})

app.listen(3000);
// http://localhost:3000/


//1. ADD MOIVES 

app.post("/addmovie", async (req, res) => {
    const moviedata = await movie.create(req.body);

    res.json({
        msg: "Movie Added Succesfully !",
        data: moviedata
    });
});

//2. GET ALL MOVIES

app.get("/getmovies", async (req, res) => {
    const moviedata = await movie.find();

    res.json({
        msg: "All Movies",
        data: moviedata
    });
});

//3. GET SPECIFIC MOVIES

app.get("/getmovie", async (req, res) => {
    const moviedata = await movie.findOne({ title: "Jawan" });
x   
    res.json({
        msg: "Movies",
        data: moviedata
    });
});

//4. UPADATE SPECIFIC MOVIE

app.put("/updatemovie", async (req, res) => {
    const updatemovie = await movie.findByIdAndUpdate(req.body.id, req.body.newData);
    if (!updatemovie) {
        res.json({
            msg: "MOVIE NOT FOUND !"
        })
    }
    res.json({
        msg: "Movies",
        data: updatemovie
    });
});

//5. DELETE MOVIE

app.delete("/deletemovie", async (req, res) => {
    const deletemovie = await movie.findByIdAndDelete(req.body.id);
    if (!deletemovie) {
        res.json({
            msg: "MOVIE NOT FOUND !"
        })
    }
    res.json({
        msg: "Movies delete sucessfully",
        data: deletemovie
    });
});