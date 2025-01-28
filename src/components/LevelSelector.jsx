export default function LevelSelector({ onClick, tags }) {
  return (
    <div className="main__screen--level-selector">
      {tags.map((tag) => (
        <button
          type="button"
          key={tag}
          className={`main__screen--level-selector__choice main__screen--level-selector__choice--${tag.toLowerCase()}`}
          onClick={onClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
