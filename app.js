const app = require("./config/app");
require("dotenv").config();

// Start the server
const port = process.env.APP_PORT || 3000; // Set the port
app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
});
