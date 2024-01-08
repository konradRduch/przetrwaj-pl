import { ResourceType } from './resourceType';

export class Incident {
    constructor(
        public title: string,
        public description: string,
        public address: string,
        public location: {
            latitude: number,
            longitude: number
        },
        public creationDate: Date,
        public expirationDate: Date,
        public dangerLevel: number,
        public recommendedResources?: ResourceType[]
    ) { }
}