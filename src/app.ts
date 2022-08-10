// Setup biến môi trường.
import "dotenv/config";
// using typedi

import "reflect-metadata";
// comes here after you imported the reflect-metadata package!
// Config Server
import app from "./boot/useExpress";
// Run Server
const runApp = () => {
  try {
    app.listen(
      +process.env.PORT || 3000,
      process.env.HOSTNAME || "localhost",
      () => {
        console.log(
          `Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/v1/documentation`
        );
      }
    );
  } catch (error) {
    console.log("%cserver.ts line:16 error", "color: #007acc;", error);
    process.exit(1);
  }
};

runApp();
