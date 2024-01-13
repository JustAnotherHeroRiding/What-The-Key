import { ApiErrorResponse } from "../services/TrackService";

export function isApiErrorResponse(data: any): data is ApiErrorResponse {
  return data && typeof data === "object" && "statusCode" in data;
}
