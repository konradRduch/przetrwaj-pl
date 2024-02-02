import { Resource } from "./resource";
import { Location } from "./location";

export interface ResourcePoint {
    location: Location;
    title: string;
    resources: Resource[];
}