import { Vehicle } from '@app/_models/vehicle';
import { VehicleAppliedDiscounts } from '@app/_models/vehicle-applied-discounts'

export class VehicleReceipts {
    baseCost: number;
    finalCost: number;
    appliedDiscounts: VehicleAppliedDiscounts;
    vehicle: Vehicle;
}
