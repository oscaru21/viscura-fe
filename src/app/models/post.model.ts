export interface Post {
    id?: string;
    caption?: string;
    image_ids?: number[];
    event_id?: number;
}

export interface PostRequest {
    event_id: number;
    caption: string;
    image_ids: number[];
    user_id: number
}