import { ResourceType } from './resourceType';

export interface IncidentType {
    name: string;
    description: string;
    recommendedResources?: ResourceType[]
}