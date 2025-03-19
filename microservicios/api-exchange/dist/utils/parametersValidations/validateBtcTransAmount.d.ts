import { ISettings } from '../../components/settings/settings.model';
import { IAsset } from '../../components/asset/asset.model';
import { TCreateListing } from '../../components/listing/listing/listing.dto';
import { TCreateTransaction } from '../../components/transaction/transaction.dto';
export declare function validateBtcTransAmount(settings: ISettings, asset: IAsset, transaction: TCreateTransaction | TCreateListing): Promise<TCreateTransaction | TCreateListing>;
//# sourceMappingURL=validateBtcTransAmount.d.ts.map