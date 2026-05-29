export interface CloudEvent<T> {
    id: number;
    source: string;
    specversion: string;
    type: string;
    time: string;
    datacontenttype: string;
    data: T;
}
