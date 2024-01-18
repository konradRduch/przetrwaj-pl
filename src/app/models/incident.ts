import { IncidentType } from "./incidentType";

export interface Incident {
    title: string,
    description: string,
    incidentType: IncidentType,
    address: string,
    location: {
        latitude: number,
        longitude: number
    }
    creationDate: Date,
    expirationDate: Date,
    dangerLevel: number,
}