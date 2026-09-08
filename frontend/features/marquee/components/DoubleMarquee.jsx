"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const communityPartners = [
  {
    name: "Codrithm",
    src: "/assets/community-partners/Codrithm.jpg",
  },
  {
    name: "Techverse",
    src: "/assets/community-partners/TECHVERSE_.jpg",
  },
  {
    name: "PALS UET",
    src: "/assets/community-partners/PALS UET.jpg",
  },
  {
    name: "UCP IEEE Student Chapter",
    src: "/assets/community-partners/UCP IEEE Student Chapter_.jpg",
  },
  {
    name: "AWS Student Builder Group UET Lahore",
    src: "/assets/community-partners/AWS Student Builder Group UET Lahore_.jpg",
  },
  {
    name: "ACM UET",
    src: "/assets/community-partners/ACM UET.jpg",
  },
  {
    name: "GDGoC UMT",
    src: "/assets/community-partners/GDGoc UMT.png",
  },
  {
    name: "Cyber Community Pakistan",
    src: "/assets/community-partners/Cyber Community Pakistan_.jpg",
  },
  {
    name: "AWS Women in Tech Lahore",
    src: "/assets/community-partners/AWS User Groups Women In Tech_Lahore.jpg",
  },
  {
    name: "UET Tribune",
    src: "/assets/community-partners/UET Tribune.jpg",
  },
  {
    name: "Superior AI Society",
    src: "/assets/community-partners/Superior AI society_.jpg",
  },
  {
    name: "Velora AI",
    src: "/assets/community-partners/Velora AI.jpg",
  },
  {
    name: "Hack The Box",
    src: "/assets/community-partners/Hack The Box.jpg",
  },
  {
    name: "Tech Hierarchy",
    src: "/assets/community-partners/Tech Herriracy_.jpg",
  },
  {
    name: "EMMUverse Technologies",
    src: "/assets/community-partners/EMMUverse Technologies_.jpg",
  },
  {
    name: "Kohaq",
    src: "/assets/community-partners/Kohaq.png",
  },
  {
    name: "Skill Sprint",
    src: "/assets/community-partners/Skill Sprint.jpg",
  },
  {
    name: "UMT ACM",
    src: "/assets/community-partners/UMT ACM.jpg",
  },
  {
    name: "Farabi Science Society",
    src: "/assets/community-partners/Farabi Science Society_.jpg",
  },
  {
    name: "GDGoC BNU",
    src: "/assets/community-partners/GDoC BNU.png",
  },
];

const firstColumn = communityPartners.filter(
  (_, index) => index % 2 === 0
);

const secondColumn = communityPartners.filter(
  (_, index) => index % 2 !== 0
);

const partnerTracks = [
  [...firstColumn, ...firstColumn],
  [...secondColumn, ...secondColumn],
];

function PartnerCard({ partner }) {
  return (
    <article className="partner-card">
      <div className="partner-logo-box">
        <img
          src={partner.src}
          alt={`${partner.name} logo`}
          loading="lazy"
          className="partner-logo"
        />
      </div>

      <div className="partner-name-box">
        <h3>{partner.name}</h3>
      </div>
    </article>
  );
}

export default function DoubleMarquee() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const arrowPaths =
      ".marquee-left .marquee-svg-item:nth-child(2) path";

    gsap.set(arrowPaths, {
      strokeDashoffset: 1000,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".Double-marquee",
        start: "top 70%",
        toggleActions:
          "play none none reverse",
      },
    });

    timeline
      .to(".marquee-underline", {
        scaleX: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(
        ".marquee-left .marquee-svg-item:nth-child(1)",
        {
          scale: 1,
          opacity: 1,
          rotation: -10,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .to(
        arrowPaths,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      timeline.kill();

      ScrollTrigger.getAll().forEach(
        (trigger) => {
          if (
            trigger.vars.trigger ===
            ".Double-marquee"
          ) {
            trigger.kill();
          }
        }
      );
    };
  }, []);

  return (
    <>
      <div className="marquee-left">
        <div className="marquee-text-container">
         <p className="marquee-eyebrow">
  Strategic Community Network
</p>

<h2>
  partnerships that
  <br />

  <span className="text-with">
    power progress.
  </span>
</h2>

<p className="marquee-description">
  Collaborating with leading communities to create opportunities,
  exchange knowledge and drive meaningful innovation.
</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="marquee-underline"
            viewBox="0 0 132 5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 2.08377C44.3458 3.90451 87.9791 5.71442 131 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="marquee-blob-container">
          <img
            src="/assets/Marquee-blob SVG/marquee-blob.svg"
            className="marquee-blob"
            alt=""
            aria-hidden="true"
          />

          <div className="marquee-svg-container">
            <div className="marquee-svg-item">
              <img
                src="/assets/Marquee-blob SVG/marquee-hand.svg"
                alt=""
                aria-hidden="true"
              />
            </div>

            <div className="marquee-svg-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 386 127"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-right">
        {partnerTracks.map(
          (partners, columnIndex) => (
            <div
              key={columnIndex}
              className="marquee-column"
            >
              <div className="marquee-track">
                {partners.map(
                  (partner, partnerIndex) => (
                    <PartnerCard
                      key={`${columnIndex}-${partner.name}-${partnerIndex}`}
                      partner={partner}
                    />
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}