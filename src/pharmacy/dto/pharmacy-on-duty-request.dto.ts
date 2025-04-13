import { IsEnum } from 'class-validator';
import { RegionQueryParam } from '../utils/types';

export class GetPharmacyByRegionQuery {

    @IsEnum(RegionQueryParam, {
        message: `Bad Request. The region must be one of the following: ${Object.values(RegionQueryParam).join(', ')}`,
    })
    region: RegionQueryParam;
};
