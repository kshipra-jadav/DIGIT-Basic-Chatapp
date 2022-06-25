const inputField = document.querySelector("#chat-message")
const sendBtn = document.querySelector("#send-btn")
const chatItems = document.querySelector(".chat-items")
const socket = io()

socket.on("server-message", (data) => {
	displayServerMessage(data)
})

inputField.addEventListener("keypress", (e) => {
	if (e.key === "Enter" && e.target.value !== "") {
		displayUserMessage(e.target.value)
		sendUserMessage(e.target.value)
		e.target.value = ""
		chatItems.scrollTop = chatItems.scrollHeight
	}
})

sendBtn.addEventListener("click", (e) => {
	if (inputField.value !== "") {
		displayServerMessage(inputField.value)
		sendUserMessage(inputField.value)
		inputField.value = ""
		chatItems.scrollTop = chatItems.scrollHeight
	}
})

function displayUserMessage(text) {
	let messageContainer = document.createElement("div")
	messageContainer.classList.add("message", "user-msg")
	messageContainer.innerText = text
	chatItems.appendChild(messageContainer)
	chatItems.scrollTop = chatItems.scrollHeight
}

function displayServerMessage(text) {
	let messageContainer = document.createElement("div")
	messageContainer.classList.add("message", "server-msg")
	messageContainer.innerText = text
	chatItems.appendChild(messageContainer)
	chatItems.scrollTop = chatItems.scrollHeight
}

function sendUserMessage(text) {
	socket.emit("user-message", text)
}
