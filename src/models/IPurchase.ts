export default interface IPurchase{
    purchaseId: number;
    amount: number;
    date: string;
    customerId: number
    couponId: number;
    imageSrc?: string;
    couponName?: string;
    categoryId: number;
    companyId: number;
}