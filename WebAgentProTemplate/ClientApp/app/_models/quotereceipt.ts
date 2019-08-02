import { Quote } from '@app/_models/quote';
import { QuoteAppliedDiscounts } from '@app/_models/quote-applied-discounts';
import { DriverReceipts } from '@app/_models/driver-receipts';
import { VehicleReceipts } from '@app/_models/vehicle-receipts';

export class QuoteReceipt {
    baseCost: number;
    finalCost: number;
    appliedDiscounts: QuoteAppliedDiscounts;
    driverReceipts: DriverReceipts[];
    vehicleReceipts: VehicleReceipts[];
    quote: Quote;
}
