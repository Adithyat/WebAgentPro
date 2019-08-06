import { Vehicle } from '@app/_models/vehicle';
import { VehicleAppliedDiscounts } from '@app/_models/vehicle-applied-discounts'
import { Driver } from '@app/_models/driver'

export class VehicleReceipts {
    baseCost: number;
    finalCost: number;
    vehicleAppliedDiscounts: VehicleAppliedDiscounts;
    primaryDriver: Driver;
    vehicle: Vehicle;
}
