/**
 * lotties 객체를 업데이트 합니다.
 * `assets/lotties/` 경로에 새 파일이 추가 될 경우, `node update-lotties-index.ts` 명령어를 실행해주세요.
 * Reference: https://www.freecodecamp.org/news/how-to-structure-your-project-and-manage-static-resources-in-react-native-6f4cfc947d92/
 */

const fs = require("fs")

//* 공통 이미지들
const fileNames = () => {
  const array = fs
    .readdirSync("../lotties/")
    .filter((file) => {
      return file.endsWith(".json")
    })
    .map((file) => {
      return file.replace(".json", "")
    })

  return Array.from(new Set(array))
}

const generateLottiesIndex = () => {
  let properties = fileNames()
    .map((name) => {
      return `${name}: require("./${name}.json")`
    })
    .join(",\n  ")

  const string = `//! 로티 파일명은 항상 언더바 (_) 로 작성해주세요. - 대시 (-) 사용 금지.
  
export const lotties = {
  ${properties},
}
`

  fs.writeFileSync("../lotties/index.ts", string, "utf8")
}

generateLottiesIndex()
