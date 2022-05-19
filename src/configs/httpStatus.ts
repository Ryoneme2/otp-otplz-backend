interface Status {
  ok: number,
  created: number,
  noContent: number,
  badRequest: number,
  forbidden: number,
  notFound: number,
  Conflict: number,
  InternalServerError: number
}

export const httpStatus : Status = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  Conflict: 409,
  InternalServerError: 500
}