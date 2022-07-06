import React, { FC, useState, useEffect } from "react"
import axios from "axios"

export const apiTest = () => {
  const baseURL = "https://jsonplaceholder.typicode.com/posts/1"
  const [post, setPost] = useState(null)

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data)
    })
  }, [])

  if (!post) return null
  console.log(post)

  return post
}

export const searchPetSitter = () => {
  const baseURL =
    "http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1/pet-sitters/search"

  const body = {
    lat: 37.48,
    lng: 127.15,
    startTime: "2022-07-04T20:13:40",
    endTime: "2022-07-04T22:13:41",
    petIds: [1, 3],
    maxDistance: 10,
    page: 0
  }

  const [post, setPost] = useState(null)

  useEffect(() => {
    axios
      .get(baseURL, {
        params: body,
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((response) => {
        setPost(response.data)
      })
  }, [])

  if (!post) return null
  console.log(post)

  return post
}

export const callApi = async (method, path, data, params = {}) => {
  const headers = { "Content-Type": "application/json" }
  const baseUrl = "http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1"
  const fullUrl = `${baseUrl}${path}`
  if (method === "get" || method === "delete") {
    console.log("fullUrl - if:", fullUrl)
    return axios[method](fullUrl, { headers, params })
  } else {
    console.log("fullUrl - else:", fullUrl)
    return axios[method](fullUrl, data, { headers })
  }
}
