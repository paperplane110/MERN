/*
 * @Description:
 * @version:
 * @Author: TianyuYuan
 * @Date: 2021-12-07 22:47:39
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-07 22:51:15
 */

const dataRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d')

function jsonDateReviver (key, value) {
  if (dataRegex.test(value)) return new Date(value)
  return value
}

export default async function graphQLFetch (query, variables = {}) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    })
    const body = await response.text()
    const result = JSON.parse(body, jsonDateReviver)

    if (result.errors) {
      const error = result.errors[0]
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ')
        alert(`${error.message}:\n ${details}`)
      } else {
        alert(`${error.extensions.code}: ${error.message}`)
      }
    }
    return result.data
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`)
  }
}
