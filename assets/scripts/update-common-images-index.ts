//? 이 코드는 assets/common-images/index.us 파일을 업데이트 해주는 함수이다.
//? image import, export deafult 를 만들어준다!
//? Reference: https://www.freecodecamp.org/news/how-to-structure-your-project-and-manage-static-resources-in-react-native-6f4cfc947d92/

const fs = require("fs")

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

const generate = () => {
  let properties = imageFileNames()
    .map((name) => {
      return `${name}: require('../common-images/${name}.png')`
    })
    .join(",\n  ")

  const string = `//! 항상 이미지 파일명은 언더바 (_) 로 작성한다
  const IMAGES = {
  ${properties}
}

//! 예외적으로 export default 허용 
export default IMAGES
`

  fs.writeFileSync("../common-images/index.ts", string, "utf8")
}

generate()
