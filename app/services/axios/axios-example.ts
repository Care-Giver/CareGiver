import axios from "axios"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

/**
 * JSONPlaceholder의 게시물(post) 목록을 가져오는 함수입니다.
 * @returns {Promise<Post[]>} 게시물 목록을 담은 Post 타입의 배열을 반환합니다.
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
    console.log("response.data", response.data)
    console.log("response.data typeof", typeof response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * jsonplaceholder API에서 ID에 해당하는 게시물(post)을 가져오는 함수입니다.
 * @param {number} id - 가져올 게시물의 ID
 * @returns {Promise<Post>} 게시물(post)을 담은 Promise 객체를 반환합니다.
 */
export async function getPostById(id: number): Promise<Post> {
  try {
    const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return {} as Post
  }
}

/**
 * jsonplaceholder API에서 모든 사용자(user)를 가져오는 함수입니다.
 * @returns {Promise<User[]>} 사용자 목록을 담은 Promise 객체를 반환합니다.
 */
export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * jsonplaceholder API에서 ID에 해당하는 사용자(user)를 가져오는 함수입니다.
 * @param {number} id - 가져올 사용자의 ID
 * @returns {Promise<User>} 사용자(user)를 담은 Promise 객체를 반환합니다.
 */
export async function getUserById(id: number): Promise<User> {
  try {
    const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return {} as User
  }
}

/**
 * Create a new post on the jsonplaceholder API.
 * @param {Post} post - The Post object to create.
 * @returns {Promise<Post>} Promise object representing the created Post object.
 */
export async function createPost(post: Post): Promise<Post> {
  try {
    const response = await axios.post<Post>("https://jsonplaceholder.typicode.com/posts", post)
    return response.data
  } catch (error) {
    console.error(error)
    return {} as Post
  }
}

/**
 * Create a new user on the jsonplaceholder API.
 * @param {User} user - The User object to create.
 * @returns {Promise<User>} Promise object representing the created User object.
 */
export async function createUser(user: User): Promise<User> {
  try {
    const response = await axios.post<User>("https://jsonplaceholder.typicode.com/users", user)
    return response.data
  } catch (error) {
    console.error(error)
    return {} as User
  }
}
