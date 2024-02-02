import { IncidentType } from "./incidentType";
import { Location } from "./location";

export interface Incident {
    title: string,
    description: string,
    incidentType: IncidentType,
    location: Location;
    creationDate: Date,
    expirationDate: Date,
    dangerLevel: number,
}