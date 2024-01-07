import { ResourceType } from './resourceType';

export interface Incident {
    title: string;
    description: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    creationDate: Date;
    expirationDate: Date;
    dangerLevel: number;
    recommendedResources?: ResourceType[];
}