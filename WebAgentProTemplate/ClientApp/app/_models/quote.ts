import { Driver } from '@app/_models/driver';
import { Vehicle } from '@app/_models/vehicle';
export class Quote {
    quoteId: number;
    q_FirstName: string;
    q_LastName: string;
    address: string;
    city: string;
    q_StateCode: string;
    postalCode: string;
    q_SSN: string;
    q_DateOfBirth: string;
    q_Email: string;
    previousCarrier: number;
    lessThanThreeYearsDriving: Boolean;
    claimInLastFiveYears: Boolean;
    movingViolationInLastFiveYears: Boolean;
    forceMultiCarDiscount: Boolean;
    createdOnMobile: boolean;
    submittedOnMobile: boolean;
    quoteStatus: number;
    quoteDrivers: Driver[];
    quoteVehicles: Vehicle[];
}
    
