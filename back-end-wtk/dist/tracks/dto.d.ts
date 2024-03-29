export declare class AddTrackDto {
    userId: string;
    trackId: string;
    source: 'library' | 'recycleBin';
}
export declare class DeleteTrackDto {
    userId: string;
    trackId: string;
}
export declare class AddTabsDto {
    userId: string;
    trackId: string;
    tabUrl: string;
}
export declare class AddToHistoryDto {
    userId: string;
    trackId: string;
}
