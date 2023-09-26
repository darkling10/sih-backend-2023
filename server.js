import express from "express"


const app = express();

const PORT = process.env.PORT || 8080;

app.get("/",(req,res)=>{
    console.log("Home dir")
    res.send("<h1>Hiiiii</h1>");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
