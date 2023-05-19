export enum Endpoint {
  GetDirectories = 'api/directory/GetDirectories',
  CreateDirectory = 'api/directory/CreateDirectory',
}

export const post = async (body: any, endpoint: Endpoint) => {
  const url = `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/${endpoint}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION,
      },
      body: JSON.stringify(body),
    })

    const responseBody = await response.json()
    return responseBody
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const get = async (endpoint: Endpoint) => {
  const url = `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/${endpoint}`

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION,
      },
    })

    const body = await resp.json()
    return body
  } catch (error) {
    console.log(error)
    throw error
  }
}
