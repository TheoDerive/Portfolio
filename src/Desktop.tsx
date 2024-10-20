import Wallpaper from "./components/Wallpaper";
import useFilesGrid from "./hooks/useFilesGrid";

export default function Desktop() {
  const { filesGrid, can_send_file_to } = useFilesGrid();

  return (
    <section className="desktop">
      <Wallpaper />

      {filesGrid.map((column, index) => (
        <section key={index + 1} id={`${index + 1}`} className="column">
          {column.map((grid) => (
            <div
              key={grid.id}
              onClick={() => can_send_file_to(grid, 10)}
              id={`${grid.id}`}
              className="grid"
            >
              {grid.content ? (
                <span>
                  {grid.id}
                  {grid.content.name}
                </span>
              ) : null}
            </div>
          ))}
        </section>
      ))}
    </section>
  );
}
