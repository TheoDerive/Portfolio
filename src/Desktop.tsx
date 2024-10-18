import File from "./components/File";
import Folder from "./components/Folder";
import Wallpaper from "./components/Wallpaper";
import { files } from "./data/files";
import { useAppStore } from "./store";
import Window from "./components/Window";

export default function Desktop() {
  const { windows } = useAppStore();

  return (
    <section className="desktop">
      <Wallpaper />

      {files.map((element) => {
        switch (element.type) {
          case "file":
            return <File prev_position={[20, 20]} file={element} />;

          case "folder":
            return <Folder prev_position={[50, 20]} folder={element} />;

          default:
            return null;
        }
      })}

      {windows.map((window) => (
        <Window
          key={window.id}
          window_element={window}
          prev_position={[30, 30]}
        />
      ))}
    </section>
  );
}
