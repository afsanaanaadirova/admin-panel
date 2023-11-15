export type ProductCardType = {
    id: number;
    name: string;
    description: string;
    category:string;
    price:number;
    image:string;
    deleteHandler: () => void;
  };