import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"],
    credentials: true,
  });

  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
