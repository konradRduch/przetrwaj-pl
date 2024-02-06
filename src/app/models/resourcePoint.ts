import { Resource } from "./resource";
import { Location } from "./location";

export interface ResourcePoint {
    title: string;
    location: Location;
    resources: Resource[];
}