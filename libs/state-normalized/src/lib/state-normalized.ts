type FetchData = {
  id: string;
  data: string;
}

type NormizeFetchData = FetchData[]

type FetchDataById = Record<string, FetchData>

export const normalizeFetchData = (data: NormizeFetchData) => {
  const byId:FetchDataById = {}
  const allIds: string[] = []

  data.forEach(dataItem => {
    byId[dataItem.id] = dataItem

    allIds.push(dataItem.id)
  })

  return {
    byId,
    allIds,
  }
}
