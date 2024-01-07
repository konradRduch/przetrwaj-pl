import { Resource } from "./resource";

export interface ResourcePoint {
    location: {
        lat: number,
        lng: number,
    };
    title: string;
    resources: Resource[];
}