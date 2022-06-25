const express = require("express")
const socket_io = require("socket.io")
const PORT = 3000
const app = express()
const server = app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
const io = socket_io(server)
const path = require("path")

app.use(express.static("public", { index: false }))

io.on("connection", (socket) => {
	socket.on("user-message", (data) => {
		io.emit("server-message", data)
	})
})

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"))
})
