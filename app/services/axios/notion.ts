import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { SettlementType } from "#screens"
import { Client } from "@notionhq/client"
import {
  CreatePageParameters,
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints"

const NOTION_API_KEY = "secret_T6mOPFNkp3e7EUGqqpV14d1jw6V2W2LNqhzqCntdrli"
const NOTION_DATABASE_ID = "a453e770df8b42d78605b17565bea560"
const notion = new Client({ auth: NOTION_API_KEY })

type TextType = {
  type?: "text"
  text: {
    content: string
  }
}
type StatusType = "정산 예정" | "정산 완료"
type MonthType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
type MultiSelectType = {
  color: "gray"
  name: MonthType
}
type ChildrenType = {
  type: "code"
  code: {
    caption: TextType[]
    // eslint-disable-next-line camelcase
    rich_text: TextType[]
    language: "json"
  }
}
export interface PostSettlementInput {
  parent: {
    type: "database_id"
    databaseId: string
  }
  properties: {
    userId: {
      title: TextType[]
    }
    status: {
      select: {
        name: StatusType
      }
    }
    month: {
      // eslint-disable-next-line camelcase
      multi_select: MultiSelectType[]
    }
  }
  children: ChildrenType[]
}
export interface PostSettlementInputParams {
  userId: string
  months: MonthType[]
  userInfoContent: {
    userId: string
    bank: string
    account: string
    name: string
  }
  settlementInfoContent: SettlementType[]
}

export type GetSettlementResponse =
  | {
      isSuccess: true
      results: PageObjectResponse[]
    }
  | {
      isSuccess: false
      reason?: string
    }
export const postNotionSettlement = async (params: PostSettlementInputParams): Promise<any> => {
  const { userId, months, userInfoContent, settlementInfoContent } = params
  const body: CreatePageParameters = {
    parent: {
      type: "database_id",
      database_id: NOTION_DATABASE_ID,
    },
    properties: {
      userId: {
        title: [
          {
            type: "text",
            text: {
              content: userId,
            },
          },
        ],
      },
      status: {
        select: {
          name: "정산 예정",
        },
      },
      month: {
        multi_select: months.map((month) => {
          return { color: "gray", name: month }
        }),
      },
    },
    children: [
      {
        type: "code",
        code: {
          caption: [
            {
              type: "text",
              text: {
                content: "유저 정보",
              },
            },
          ],
          rich_text: [
            {
              type: "text",
              text: {
                content: JSON.stringify(userInfoContent),
              },
            },
          ],
          language: "json",
        },
      },
      {
        type: "code",
        code: {
          caption: [
            {
              type: "text",
              text: {
                content: "정산 정보",
              },
            },
          ],
          rich_text: [
            {
              type: "text",
              text: {
                content: JSON.stringify(settlementInfoContent),
              },
            },
          ],
          language: "json",
        },
      },
    ],
  }

  try {
    const response = await notion.pages.create(body)
    if (!response.object) {
      return {
        isSuccess: false,
      }
    }

    return {
      isSuccess: true,
      response: response.object,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}

export const getNotionSettlement = async (): Promise<GetSettlementResponse> => {
  try {
    const response = await notion.databases.query<QueryDatabaseResponse>({
      database_id: NOTION_DATABASE_ID,
      filter: {
        or: [
          {
            property: "userId",
            rich_text: {
              contains: "46",
            },
          },
        ],
      },
    })
    if (!response.object) {
      return {
        isSuccess: false,
      }
    }

    const results = response.results as PageObjectResponse[]
    return {
      isSuccess: true,
      results: results,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}
