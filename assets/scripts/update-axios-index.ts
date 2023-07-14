const fs = require("fs")
const path = require("path")

const dirPath = "../../app/services/axios" // replace with your directory path
const files = fs.readdirSync(dirPath).filter((file) => file !== "index.ts")

const exportStatements = files
  .filter((file) => file.endsWith(".ts"))
  .map((file) => `export * from './${file.replace(".ts", "")}';`)
  .join("\n")

fs.writeFileSync(path.join(dirPath, "index.ts"), exportStatements)
