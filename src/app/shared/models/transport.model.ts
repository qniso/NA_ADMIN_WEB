export interface Transport{
    transport_card: {
        nomenclature_name: string;
        technical_certificate: {
            num_and_series: string;
            issued_by: string;
            date_end: string;
            date_issue: string;
            technical_certificate_dop_info: {
                brand: string;
                state_number: string;
                VIN_code: string;
                colour: string;
                date_issue: string;
                seats: number;
                full_weight:number;
                empty_weight: number;
                category: string;
                fuel: string;
                body_type: string;
                engine_volume: number;
                engine_power:number;
                environmental_standard: string;
            }
        };
        using_reason_info: {
            num_and_name_contract:string;
            date_start: string;
            is_contract_fixed_term:string;
            date_end:string;
            date_next_start:string;
        };
        general_info:{
            mileage:number;
            fuel_tank_volume:number;
            height:number;
            width:number;
            length:number;
        }
    }
}