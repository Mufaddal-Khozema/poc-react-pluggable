const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	fs.readFile(path.join(__dirname, "data"), 'utf8', (err, data) => {
		if(err) {
			res.status(500).send("Error reading file");
		}
		res.send(data.trim().split(","));
	})
});

app.post('/', (req, res) => {
	fs.writeFile(path.join(__dirname, "data"), req.body.data, 'utf8', (err) => {
		if (err) {
			res.status(500).send("Error writing file");
		}
		res.send("File write successful")
	})
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
