import App from "./app";
import { initializeDIContainer } from "./src/di/initialize";

initializeDIContainer();

const app = new App({
  port: Number(process.env.PORT || 3000),
});

app.start();
