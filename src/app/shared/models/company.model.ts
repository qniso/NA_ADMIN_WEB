export interface NewCompany{
    "ukr_name":{
        "full_name": string;
        "short_name": string;
        };
    "eng_name":{
        "full_name": string;
        "short_name":string;
        };
    "address": string;
    "postal_address": string;
    "communication":{
        "phone_number":[string]
        "email": string;
        };
    "banking_details":{
        "remittance_bank": string;
        "iban": string;
        },
    "identification_details":{
        "edrpou":string;
        "registration_certificate": string;
        "ipn": string;
        "accounting_tax_info": string;
        "tax_form": string;
        "licence_info": string
        }
}