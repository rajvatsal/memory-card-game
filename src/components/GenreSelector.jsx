import '/src/styles/GenreSelector.scss'

export default function GenreSelector({ onClick, tags }) {
  return (
    <div className="screen--genre-selector">
      <div className="screen--genre-selector__container">
        <h1>Choose A Genre</h1>
        <div className="screen--genre-selector__button-container">
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              className={` screen--genre-selector__button-container__choice screen--genre-selector__button-container__choice--${tag.toLowerCase()}`}
              onClick={onClick(tag)}
            >
              <span className="screen--genre-selector__button-container__choice__title">
                {tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
