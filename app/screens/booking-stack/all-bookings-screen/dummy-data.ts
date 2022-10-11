// ? 위탁 reserve data (crecheReserve)
// {
//     "id": 1,
//     "createAt": "2022-10-07T08:25:00.699Z",
//     "updatedAt": "2022-10-07T09:10:15.587Z",
//     "status": "Waiting",
//     "services": [
//       "산책"
//     ],
//     "startDay": "2022-10-06T15:00:00.000Z",
//     "endDay": "2022-10-08T15:00:00.000Z",
//     "reviewStatus": "Waiting",
//     "request": "잘 부탁드립니다."
// }

// ? 방문 reserve data (petsitterReserve)
// {
//     "id": 1,
//     "createAt": "2022-10-07T14:48:47.066Z",
//     "updatedAt": "2022-10-07T14:49:49.022Z",
//     "status": "Waiting",
//     "reviewStatus": "Waiting",
//     "services": [
//       "산책"
//     ],
//     "startTime": "2022-10-07T15:00:00.000Z",
//     "endTime": "2022-10-10T15:00:00.000Z",
//     "request": null
// }

export const bookingsDummy = [
  // ? crecheId
  {
    crecheId: 1,
    petsitterId: 1, // crecheId -> userId
    // userId: 7,
    // serviceType: "위탁",
    startDate: "2022-09-14",
    endDate: "2022-09-14",
  },
  // ? 방문
  {
    visitId: 1,
    petsitterId: 2,
    // userId: 7,
    // serviceType: "방문",
    startDate: "2022-09-14T22:00:00",
    endDate: "2022-09-14T22:00:00",
  },
]
