interface FlightQuota {
  quota: number
  reason: number
}

interface ResponseBody {
  data: Record<string, string>
}

const BASE_URL = 'https://httpstat.us'

export const useFlightQuota = () => {
  const getFlightQuota = async () => {
    const data = await $fetch<ResponseBody>(`${BASE_URL}/200`, {
    })

    return {
      ...data,
      // fake data response
      quota: 2,
    }
  }

  const updateFlightQuota = async (flightQuotaBody: FlightQuota) => {
    return await $fetch(`${BASE_URL}/random/200,400`, {
      method: 'PATCH',
      body: {
        ...flightQuotaBody,
      },
    })
  }

  return {
    getFlightQuota,
    updateFlightQuota,
  }
}
