export declare class CardProcessorService {
    private readonly logger;
    processCard(payload: any): Promise<{
        cardId: `${string}-${string}-${string}-${string}-${string}`;
        cardNumber: string;
        expirationDate: string;
        cvv: string;
    }>;
    private simulateDelay;
    private generateCardNumber;
    private generateCvv;
}
