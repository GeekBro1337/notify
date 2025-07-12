import { Elysia } from "elysia";

const app = new Elysia();

app.get("/api/user", () => {
  return {
    id: 1,
    name: "Alisher",
    email: "alisher@example.com",
    registeredAt: new Date().toISOString(),
  };
});

app.listen(3000);

console.log("🚀 API запущен: http://localhost:3000");
