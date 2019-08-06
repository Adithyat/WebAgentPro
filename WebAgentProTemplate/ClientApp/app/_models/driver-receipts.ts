import { Driver } from '@app/_models/driver';
import { DriverAppliedDiscounts } from '@app/_models/driver-applied-discounts'

export class DriverReceipts {
    baseCost: number;
    finalCost: number;
    driverAppliedDiscounts: DriverAppliedDiscounts;
    driver: Driver;
    multiplier: number;
}
