const fs = require("fs")

/**
 * Generate name set of image files
 */
const extractNames = (path) => {
  const sourceNames = fs
    .readdirSync(path)
    .filter((file) => file.endsWith(".png"))
    .filter((file) => !file.includes("@")) //! only takes filenames w/o "@"
    .map((file) => file.replace(".png", ""))

  const validatedNames = sourceNames.map((file) => file.replace(/-/g, "_")) //? Change all "-" to "_"

  // console.log(array)
  // console.log(validatedNames)
  return { sourceNames, validatedNames }
}

/**
 * Generate index.ts file
 */
const generateIndexFile = () => {
  const { sourceNames, validatedNames } = extractNames("./")
  const { sourceNames: btnSourceNames, validatedNames: btnValidatedNames } = extractNames(
    "./bottom-tab-navigator",
  )

  const result = sourceNames
    .map((sourceName, index) => {
      const validatedName = validatedNames[index]
      return `${validatedName}: require("./${sourceName}.png")`
    })
    .join(",\n  ")

  const btnResult = btnSourceNames
    .map((sourceName, index) => {
      const validatedName = btnValidatedNames[index]
      return `${validatedName}: require("./bottom-tab-navigator/${sourceName}.png")`
    })
    .join(",\n  ")

  const string = `export const icons = {
  ${result},
  ${btnResult}
  }
`
  fs.writeFileSync("./index.ts", string, "utf8")
}

generateIndexFile()
