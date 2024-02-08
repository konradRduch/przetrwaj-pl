import { Resource } from "./resource";
import { Location } from "./location";

export interface ResourcePoint {
    pointId: number;
    title: string;
    location: Location;
    resources: Resource[];
}