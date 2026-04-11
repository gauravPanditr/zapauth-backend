
import app from "./app";
import serverConfig from "./config";
import { connectMongoDB } from "./config/dbConfig";
 connectMongoDB();
app.listen(serverConfig.PORT, async () => {

    console.log(`Server started at PORT: ${serverConfig.PORT}`);
});
