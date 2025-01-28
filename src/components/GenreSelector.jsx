import '/src/styles/GenreSelector.scss'

export default function GenreSelector({ onClick, tags }) {
  return (
    <div className="screen--genre-selector">
      {tags.map((tag) => (
        <button
          type="button"
          key={tag}
          className={`screen--genre-selector__choice screen--genre-selector__choice--${tag.toLowerCase()}`}
          onClick={onClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
