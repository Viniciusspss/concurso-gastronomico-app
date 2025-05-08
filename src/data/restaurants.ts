import { RestaurantType } from "@/types/user/restaurant";

export const restaurants: RestaurantType[] = [
  {
    id: "1",
    cnpj: "000",
    name: "BDC",
    password: "123",
    dishes: [
      {
        id: "2",
        imageURL: "https://",
        title: "TÍTULO DO PRATO",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 35,
      },
      {
        id: "3",
        imageURL: "https://",
        title: "TÍTULO DO PRATO",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 35,
      },
      {
        id: "4",
        imageURL: "https://",
        title: "TÍTULO DO PRATO",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 35,
      },
      {
        id: "5",
        imageURL: "https://",
        title: "TÍTULO DO PRATO",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 35,
      },
    ],
  },
  {
    id: "2",
    cnpj: "001",
    name: "Bar da Curva",
    password: "123",
    dishes: [
      {
        id: "2",
        imageURL: "https://",
        title: "Cuscuz",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10,
      },
    ],
  },
];
