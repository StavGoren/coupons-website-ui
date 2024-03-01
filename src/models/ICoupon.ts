export interface ICoupon{
    id: number;
    name: string;
    priceInNis: number;
    description: string;
    startDate: string;
    endDate: string;
    unitsInStock: number;
    couponCode: string;
    imageSrc: string;
    categoryId: number;
    categoryName: string; 
    companyId?: number;


    // constructor(id: number, name: string, priceInNis: number, description: string, startDate: string, 
    //     endDate: string, couponNumber: string, imageSrc: string, categoryId?: number, companyId?: number) {
    //         this.id = id;
    //         this.name = name;
    //         this.priceInNis = priceInNis;
    //         this.description = description;
    //         this.startDate = startDate;
    //         this.endDate = endDate;
    //         this.couponNumber = couponNumber;
    //         this.imageSrc = imageSrc;
    //         this.categoryId = categoryId;
    //         this.companyId = companyId;
    //     }
    }
