import { ResourceType } from "./resourceType";

export interface Resource {
    resourceType: ResourceType;
    quantity: number;
}