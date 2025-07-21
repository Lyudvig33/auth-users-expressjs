import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { createApp } from "./app";

const PORT = process.env.PORT || 3000;
const app = createApp();

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database has been initialized!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err);
  });
