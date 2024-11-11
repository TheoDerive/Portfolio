import { File, Folder } from "../type/filesGridType";

export const pathElement: (File | Folder)[] = [
  {
    id: 6000,
    name: "Console",
    type: "console",
    content: "",
    path: "/Console",
    onDesktop: {
      id: 100,
    },
  },
  {
    id: 3000,
    name: "File",
    type: "text",
    content: "coucou",
    path: "/File",
    onDesktop: {
      id: 120,
    },
  },
  {
    id: 3003,
    name: "Test",
    type: "text",
    content: "coucou",
    path: "/File",
    onDesktop: {
      id: 110,
    },
  },
  {
    id: 3001,
    name: "Folder",
    type: "folder",
    path: "/Folder",
    content: [
      {
        id: 3001,
        name: "Folder1",
        type: "folder",
        path: "/Folder/Folder1",
        content: [
          {
            id: 3003,
            name: "Test",
            type: "text",
            content: "coucou",
            path: "/File",
            onDesktop: {
              id: 110,
            },
          },
        ],
        onDesktop: {
          id: 130,
        },
      },
    ],
    onDesktop: {
      id: 130,
    },
  },
];
