
export function base64 (value) {
  return Buffer.from(value, 'utf8').toString('base64')
}

export function unbase64 (value) {
  return Buffer.from(value, 'base64').toString('utf8')
}
