import { ResourceType } from "./resourceType";

export interface Resource {
    resourceId: number;
    resourceType: ResourceType;
    quantity: number;
}