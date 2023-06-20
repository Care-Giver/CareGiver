/**
 * images 객체를 업데이트 합니다.
 * `assets/images/` 경로에 새 파일이 추가 될 경우, `node update-images-index.ts` 명령어를 실행해주세요.
 * Reference: https://www.freecodecamp.org/news/how-to-structure-your-project-and-manage-static-resources-in-react-native-6f4cfc947d92/
 */

const fs = require("fs")

//* 공통 이미지들
const imageFileNames = () => {
  const array = fs
    .readdirSync("../images/")
    .filter((file) => {
      return file.endsWith(".png")
    })
    .map((file) => {
      return file.replace(".png", "")
    })

  return Array.from(new Set(array))
}

//* 바텀탭내비게이터에 들어가는 이미지들
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

const generateImagesIndex = () => {
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

  const string = `//! 이미지 파일명은 항상 언더바 (_) 로 작성해주세요. - 대쉬 (-) 사용 금지.
  
export const images = {
  //* images
  ${properties},
  
  //* bottom-tab-navigator
  ${properties2},
}
`

  fs.writeFileSync("../images/index.ts", string, "utf8")
}

generateImagesIndex()
