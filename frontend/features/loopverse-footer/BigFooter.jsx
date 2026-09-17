import { FOOT_STICKERS } from "./data";

export function BigFooter() {
  return (
    <footer className="big-footer">
      <div className="foot-cols">
        <div className="foot-col">
          <span className="pill">looking for a job?</span>
          <b>not hiring right now :(</b>
        </div>
        <div className="foot-col">
          <span className="pill">office</span>
          <b>
            CEGA, Lahore
            <br />
            Pakistan
          </b>
          <a href="https://maps.google.com/?q=CEGA+Lahore+Pakistan" target="_blank" rel="noopener noreferrer" className="underline-link">
            Google Maps
          </a>
        </div>
        <div className="foot-col">
          <span className="pill">contact</span>
          <b>
            <a href="mailto:qk04504@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              qk04504@gmail.com
            </a>
            <br />
            send us a whatsapp*
          </b>
          <div className="foot-note">*we&apos;re millennials and gen-z: please do not call us.</div>
          <div className="foot-socials">
            <a href="https://www.linkedin.com/company/looplab-com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/looplabofficial?stkn=bXhkcnBpcG05dzVi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="foot-wordmark-wrap">
        <div className="foot-wordmark">LOOPLAB</div>

        {FOOT_STICKERS.map((sticker, i) => (
          <div key={i} className={`foot-sticker ${sticker.className}`} style={sticker.style}>
            {sticker.className === "burst" ? (
              <>
                <svg viewBox="0 0 100 100">
                  <polygon
                    points="50,4 58,28 82,20 66,40 96,46 66,54 82,80 58,64 50,94 42,64 18,80 34,54 4,46 34,40 18,20 42,28"
                    fill="#ff7a59"
                    stroke="#111"
                    strokeWidth="2"
                  />
                </svg>
                <span>BAM</span>
              </>
            ) : (
              sticker.content
            )}
          </div>
        ))}

        <div className="foot-credits">credits</div>
      </div>

      <div className="foot-bottom">© 2026 Loopverse. All rights reserved.</div>
    </footer>
  );
}
