import fs = require("fs");

fs.writeFile("./124.text", JSON.stringify({ name: "123" }), (err) => {
    console.log(err)
})