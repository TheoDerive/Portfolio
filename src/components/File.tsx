import useFilesGrid from "../hooks/useFilesGrid";
import { File, GridType } from "../type/filesGridType";

export default function FileElement({
  file,
  grid,
}: {
  file: File;
  grid: GridType;
}) {
  const { can_send_file_to } = useFilesGrid();

  return (
    <article
      onClick={() => can_send_file_to(grid, 125)}
      className="file"
      id={`${file.id}`}
    >
      {file.name}
    </article>
  );
}
