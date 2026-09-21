const verifiedRating = '4.9';
const verifiedReviewCount = 223;

export function GoogleReviews({ profileUrl, reviewUrl }: { profileUrl: string; reviewUrl: string }) {
  return (
    <div className="review-integration" id="google-reviews">
      <div className="integration-bar">
        <div><span className="google-g" aria-hidden="true">G</span><strong>Google customer reviews</strong></div>
        <span className="integration-status"><i /> {verifiedRating} ★ · {verifiedReviewCount} reviews</span>
      </div>

      <div className="review-snapshot" aria-label={`${verifiedRating} out of 5 from ${verifiedReviewCount} Google reviews`}>
        <article className="review-metric-card">
          <small>Average Google rating</small>
          <strong>{verifiedRating}<span> / 5</span></strong>
          <div className="review-stars snapshot-stars" aria-hidden="true"><span className="is-filled">★</span><span className="is-filled">★</span><span className="is-filled">★</span><span className="is-filled">★</span><span className="is-filled">★</span></div>
        </article>
        <article className="review-metric-card">
          <small>Customer feedback</small>
          <strong>{verifiedReviewCount}<span> reviews</span></strong>
          <p>Read current customer comments and ratings on the official MI Lock Pros Google profile.</p>
        </article>
      </div>

      <div className="review-actions">
        <a className="button button-primary" href={profileUrl} target="_blank" rel="noreferrer">See more reviews on Google <span>↗</span></a>
        <a className="button button-secondary" href={reviewUrl} target="_blank" rel="noreferrer">Leave a Google review <span>↗</span></a>
      </div>

      <div className="review-disclosure">
        <p>Rating and review count were verified from Google on September 16, 2026. Visit Google for the latest feedback and totals.</p>
        <a href={profileUrl} target="_blank" rel="noreferrer">View on Google <span>↗</span></a>
      </div>
    </div>
  );
}
