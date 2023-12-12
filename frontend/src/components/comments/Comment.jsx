import StaticStars from './StaticStars'

export const Comment = ({ content, stars, commenter }) => {
    return (
        <div className="comment">
          {stars && (
            <div className="comment-stars">
              <StaticStars rating={stars} />
            </div>
          )}
          <div className="commenter-info">
            {commenter.shelter && (
              <div>
                <span className="commenter-type">Shelter:</span> {commenter.shelter.name}
              </div>
            )}
            {commenter.petseeker && (
              <div>
                <span className="commenter-type">Pet Seeker:</span> {commenter.petseeker.username}
              </div>
            )}
          </div>
          <div className="comment-content">{content}</div>
        </div>
      );
};
