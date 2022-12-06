//? These codes are for making an index for images
//? The index.ts file will be generated at "assets/images/"
//? Reference: https://www.freecodecamp.org/news/how-to-structure-your-project-and-manage-static-resources-in-react-native-6f4cfc947d92/

const fs = require("fs")

/**
 * Generate name set of image files
 */
const extractNames = () => {
  const sourceNames = fs
    .readdirSync("./")
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
  const { sourceNames, validatedNames } = extractNames()

  const result = sourceNames
    .map((sourceName, index) => {
      const validatedName = validatedNames[index]
      return `${validatedName}: require("./${sourceName}.png")`
    })
    .join(",\n  ")

  // console.log(result)

  const string = `export const images = {
  ${result}
  }
`
  fs.writeFileSync("./index.ts", string, "utf8")
}

generateIndexFile()

// TODO: Seperate folders to maintain images
/* //* 바텀탭내비게이터에 들어가는 이미지들
const imageFileNamesAtBottomTabNavigator = () => {
  const array = fs
    .readdirSync("../images/bottom-tab-navigator/")
    .filter((file) => {
      return file.endsWith(".png")
    })
    .map((file) => {
      return file.replace(".png", "")
    })

  return Array.from(new Set(array))
}

const generate = () => {
  let properties = imageFileNames()
    .map((name) => {
      return `${name}: require("../images/${name}.png")`
    })
    .join(",\n  ")

  let properties2 = imageFileNamesAtBottomTabNavigator()
    .map((name) => {
      return `${name}: require("../images/bottom-tab-navigator/${name}.png")`
    })
    .join(",\n  ")

  const string = `//! 항상 이미지 파일명은 언더바 (_) 로 작성한다
  const IMAGES = {
  //* images
  ${properties},
  
  //* bottom-tab-navigator
  ${properties2}
}

//! 예외적으로 export default 허용 
export default IMAGES
`

  fs.writeFileSync("../images/index.ts", string, "utf8")
}
 */
