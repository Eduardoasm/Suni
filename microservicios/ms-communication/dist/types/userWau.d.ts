export interface IMetamap {
    id?: string;
    user_id?: string;
    status?: string;
    dni_firstName?: string;
    dni_lastName?: string;
    dni_type?: string;
    dni_value?: string;
    country?: string;
}
export interface IUserAuth {
    data: {
        id: string;
        email: string;
        name: string;
        lastname: string;
        phone: number;
        language: string;
        code_reference: string | number | null;
        reset_status_pass: string | null;
        created_at: Date;
        closed_at: string | null;
        metamapStatus?: IMetamap;
        agreedToDataCollection: boolean;
        cashier_business_owner_id: string | null;
        userDniDuplicated: boolean;
        is_cashier: boolean;
    };
}
//# sourceMappingURL=userWau.d.ts.map