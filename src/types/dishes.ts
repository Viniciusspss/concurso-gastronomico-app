export type DishesType = {
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
