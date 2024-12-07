import { File, Folder } from "../type/filesGridType";

export const pathElement: (File | Folder)[] = [
  {
    id: 3000,
    name: "Fichier",
    type: "text",
    content: "",
    path: "/Fichier",
    onDesktop: {
      id: 110,
    },
  },
  {
    id: 3000,
    name: "Dossier 1",
    type: "folder",
    path: "/Dossier 1",
    content: [
      {
        id: 3001,
        name: "Dossier 1.1",
        type: "folder",
        path: "/Dossier 1/Dossier 1.1",
        content: [
          {
            id: 3001,
            name: "Fichier 1.1.1",
            type: "text",
            path: "/Dossier 1/Dossier 1.1/Fichier 1.1.1",
            content: "Vous n'etes pas au bon endroit",
          },
        ],
      },
      {
        id: 3002,
        name: "Dossier 1.2",
        type: "folder",
        path: "/Dossier 1/Dossier 1.2",
        content: [
          {
            id: 3001,
            name: "Fichier 1.2.1",
            type: "text",
            path: "/Dossier 1/Dossier 1.2/Fichier 1.2.1",
            content: "Le mot de passe est: xxx_PIPI33_xxx",
          },
        ],
      },
    ],
    onDesktop: {
      id: 100,
    },
  },
];
