export interface BasePayload {
    email: string;
    distribuidor: string;
}

export interface MediaPayload extends BasePayload {
    mediaBase64: string;
    text: string;
    title?: string;
    description?: string;
    alt_text?: string;
}


export interface InstagramPayload extends MediaPayload {
    text: string;
    mediaBase64: string;
}

export interface FacebookPayload extends MediaPayload {
    text: string;
    mediaBase64: string;
}
export interface TwitterPayload extends MediaPayload {
    text: string;
    mediaBase64: string;
}


export interface YouTubePayload extends MediaPayload {
    text: string;
    mediaBase64: string;
}


export interface PinterestPayload extends MediaPayload {
    title: string;
    alt_text: string;
    mediaBase64: string;
}

export interface TikTokPayload extends BasePayload {
    text: string;
    mediaBase64: string;
}