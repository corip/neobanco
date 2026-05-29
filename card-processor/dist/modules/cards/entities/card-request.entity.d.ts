export declare class CardRequestEntity {
    id: number;
    requestId: string;
    documentNumber: string;
    documentType: string;
    email: string;
    age: number;
    type: string;
    currency: string;
    status: string;
    retries: number;
    fullName: string;
    errorReason?: string;
    cardId?: string;
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
}
