import { File, Folder } from "../type/filesGridType";

export const pathElement: (File | Folder)[] = [
  {
    id: 3000,
    name: "Projets",
    type: "folder",
    path: "/Projets",
    content: [
      {
        id: 30001,
        name: "Portfolio Alex",
        type: "folder",
        path: "/Projets/Portfolio Alex",
        content: [
          {
            id: 300010,
            name: "Ouvrir.exe",
            type: "exe",
            path: "/Projets/Portfolio Alex/ouvrir.exe",
            content: "https://www.alex-moulinneuf.fr/",
          },
          {
            id: 300011,
            name: "Explications.txt",
            type: "text",
            path: "/Projets/Portfolio Alex/Explications.txt",
            content: "Explications",
          },
          {
            id: 300012,
            name: "Galeries.pdf",
            type: "image",
            path: "/Projets/Portfolio Alex/Galeries.pdf",
            content: [
              "/images/Projet1.png",
              "/images/Projet2.png",
              "/images/Projet3.png",
              "/images/Projet4.png",
            ],
          },
        ],
      },
    ],
    onDesktop: {
      id: 100,
    },
  },
  {
    id: 3001,
    name: "Moi",
    type: "folder",
    path: "/Moi",
    content: [
      {
        id: 30010,
        name: "Parcour.txt",
        type: "text",
        path: "/Moi/Parcour.txt",
        content: "Parcour",
      },

      {
        id: 30011,
        name: "Idees Projets",
        type: "folder",
        path: "/Moi/Idees Projets",
        content: [],
      },

      {
        id: 30012,
        name: "Qui je suis.txt",
        type: "text",
        path: "/Moi/Qui je suis.txt",
        content: "Qui je suis",
      },
    ],
    onDesktop: {
      id: 110,
    },
  },
  {
    id: 3001,
    name: "Pourquoi ce portfolio",
    type: "text",
    path: "/Pourquoi ce portfolio",
    content: "Pourquoi",
    onDesktop: {
      id: 120,
    },
  },
];
