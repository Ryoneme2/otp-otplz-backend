interface Status<T> {
  [index: string]: T
}

export const httpStatus : Status<number> = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  Conflict: 409,
  InternalServerError: 500
}