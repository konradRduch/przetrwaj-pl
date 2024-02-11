import { IncidentType } from "./incidentType";
import { Location } from "./location";

export interface Incident {
    incidentId: number
    title: string
    description: string
    incidentType: IncidentType
    location: Location
    creationDate: Date
    expirationDate: Date
    dangerLevel: number
    confirmations: number
    rejections: number
}