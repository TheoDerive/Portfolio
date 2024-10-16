import File from "./components/File";
import Wallpaper from "./components/Wallpaper";
import { files } from "./data/files";

export default function Desktop() {
  return (
    <section className="desktop">
      <Wallpaper />

      {files.map((file) =>
        file.type === "file" ? (
          <File key={file.id} file={file} prev_position={[10, 10]} />
        ) : null,
      )}
    </section>
  );
}
