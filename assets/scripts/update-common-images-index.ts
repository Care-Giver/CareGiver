//? 이 코드는 assets/common-images/index.us 파일을 업데이트 해주는 함수이다.
//? image import, export deafult 를 만들어준다!
//? Reference: https://www.freecodecamp.org/news/how-to-structure-your-project-and-manage-static-resources-in-react-native-6f4cfc947d92/

const fs = require("fs")

//* 공통 이미지들
const imageFileNames = () => {
  const array = fs
    .readdirSync("../common-images/")
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
    .readdirSync("../common-images/bottom-tab-navigator/")
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
      return `${name}: require("../common-images/${name}.png")`
    })
    .join(",\n  ")

  let properties2 = imageFileNamesAtBottomTabNavigator()
    .map((name) => {
      return `${name}: require("../common-images/bottom-tab-navigator/${name}.png")`
    })
    .join(",\n  ")

  const string = `//! 항상 이미지 파일명은 언더바 (_) 로 작성한다
  const IMAGES = {
  //* common images
  ${properties},
  
  //* bottom-tab-navigator
  ${properties2}
}

//! 예외적으로 export default 허용 
export default IMAGES
`

  fs.writeFileSync("../common-images/index.ts", string, "utf8")
}

generate()
