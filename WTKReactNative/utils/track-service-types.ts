export type dataSource = "library" | "recycleBin";
export interface addTrackProps {
  trackId: string;
  source: dataSource;
}

export interface addTabProps {
  userId: string;
  trackId: string;
  tabUrl: string;
}

export interface getTabProps {
  userId: string;
  trackId: string;
}

export interface getTracksProps {
  location: dataSource;
}

export interface deleteTrackProps {
  trackId: string;
}

export interface TrackConnection {
  id: string;
  libraryUserId: number;
  recycleBinUserId: number;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

export interface Tab {
  id: number;
  userId: number;
  trackId: string;
  tabUrl: string;
}
