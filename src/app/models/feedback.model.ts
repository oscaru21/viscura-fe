export interface Feedback {
    id: number;
    post_id: number;
    event_id: number;
    user?: string;
    avatar?: string;
    created_at?: string;
    feedback_comment: string;
    feedback_status: string;
}