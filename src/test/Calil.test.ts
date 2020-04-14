import Calil from '../api/Calil'
import { LibData, LibResponse, LibRequest } from '../api/Calil'

const fetch = async (req: LibRequest) => {
  const calil: Calil = new Calil(req)
  const res: LibResponse = await calil.search()
  return res
}

// const mockSuccess: LibResponse = {
//     libkey: [
//         { id: 1, name: "新田", status: "貸出可" },
//         { id: 2, name: "鹿浜", status: "貸出中" },
//         { id: 3, name: "竹の塚", status: "貸出可" },
//         { id: 4, name: "江南", status: "貸出可" },
//         { id: 5, name: "中央", status: "貸出可" },
//         { id: 6, name: "保塚", status: "貸出中" },
//         { id: 7, name: "興本", status: "貸出可" },
//         { id: 8, name: "佐野", status: "貸出可" },
//         { id: 9, name: "梅田", status: "貸出中" },
//     ]

// }
// test('fetch',()=>{
//     const req: LibRequest = {
//         'appkey' = process.env.APP_API_KEY,
//         'isbn'
//     }
// })
