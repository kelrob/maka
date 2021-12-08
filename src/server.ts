import app from "./app";
const PORT = process.env.PORT || 8081;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}!`));
}

export default app;
