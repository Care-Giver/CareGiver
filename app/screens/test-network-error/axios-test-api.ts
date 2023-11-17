import axios, { AxiosResponse } from "axios"
import { Platform } from "react-native"

export const getTestJsonPlaceHolder = async (params: any) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((response: AxiosResponse) => {
      console.log("Evoked on", Platform.OS)
      console.log("RESPONSE DATA", response.data)
    })
    .catch((error: Error) => {
      console.error("Evoked on", Platform.OS)
      console.error("ERROR CAUSE", error.cause)
      console.error("ERROR MSG", error.message)
    })
}
