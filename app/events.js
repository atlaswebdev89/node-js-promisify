// handler ctrl+c
process.on("SIGINT", () => {
  process.exit();
});
process.on("exit", () => {
  console.log("\nServer is stoped");
});
