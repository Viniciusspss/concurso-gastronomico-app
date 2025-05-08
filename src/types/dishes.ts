export type DishesType = {
  id: string;
  imageURL: string;
  title: string;
  description: string;
  price: number;
};

export type DishesWithRestaurant = DishesType & {
  restaurant: {
    name: string;
  };
};
