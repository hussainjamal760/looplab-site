import Navbar from "@/features/navigation/components/Navbar";
import Footer from "@/features/footer/components/Footer";
import TestimonialsCard from "@/features/service-cards/components/TestimonialsCard";

import {
  coreTeam,
  registrationTeam,
  creativeTeam,
} from "@/features/service-cards/components/teamData";

import "@/app/styles/team.css";

export const metadata = {
  title: "Our Team | LoopLab",
  description:
    "Meet the people building, organizing and growing the LoopLab community.",
};

export default function TeamsPage() {
  return (
    <>
     

      <header className="team-header">
        <Navbar />
      </header>

      <main className="full-team-page">
        {/* Hero section */}

        <section className="full-team-hero">
          <div className="full-team-hero-decoration decoration-one" />
          <div className="full-team-hero-decoration decoration-two" />

          <div className="full-team-hero-content">
            <p className="full-team-kicker">
  The LoopLab Collective
</p>

<h1>
  The minds that
  <br />
  make the <span>loop move.</span>
</h1>

<p className="full-team-description">
  Meet the builders, organizers and creative minds transforming ideas
  into meaningful LoopLab experiences.
</p>

            <a href="#our-teams" className="hero-scroll-button">
              Explore the teams
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        {/* Full team section */}

        <section className="full-team-content" id="our-teams">
          <div className="full-team-heading">
            <p className="section-eyebrow">
              The full crew
            </p>

            <h2>
              Different strengths.
              <br />
              One shared <span>vision.</span>
            </h2>

            <p>
              Use the cards or navigation arrows to explore the people
              contributing across every LoopLab team.
            </p>
          </div>

          <div className="full-team-groups">
            <TestimonialsCard
              title="Core Team"
              eyebrow="01 / Core Team"
              items={coreTeam}
              autoPlay={false}
            />

            <TestimonialsCard
              title="Registration Team"
              eyebrow="02 / Registration"
              items={registrationTeam}
              autoPlay={false}
            />

            <TestimonialsCard
              title="Marketing, Events, Graphics & Social Media"
              eyebrow="03 / Creative Team"
              items={creativeTeam}
              autoPlay={false}
            />
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <Footer />
      </footer>

    
    </>
  );
}