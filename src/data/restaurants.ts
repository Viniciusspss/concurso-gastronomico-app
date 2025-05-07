import { RestaurantType } from "@/types/user/restaurant";

export const restaurants: RestaurantType[] = [
  {
    id: "1",
    cnpj: "00",
    name: "BDC",
    password: "123",
    dishes: [
      {
        imageURL: "https://",
        title: "TÍTULO DO PRATO",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 35,
      },
      {
        imageURL: "https://",
        title: "TÍTULO DO PRATO",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 35,
      },
      {
        imageURL: "https://",
        title: "TÍTULO DO PRATO",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 35,
      },
      {
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
        imageURL: "https://",
        title: "Cuscuz",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10,
      },
    ],
  },
];
