import AnchorIcon from "../components/AnchorIcon/AnchorIcon";
import { motion } from "framer-motion"
import { useFadeInAnimSettings } from "../animations/animationHooks";
import { Link } from "react-router-dom";
import TeamMember from "../components/TeamMember/TeamMember";
import { teamData } from "../data/teamData";


const About = () => {
  const FadeInAnimSettings = useFadeInAnimSettings();
  return (
    <main className="about">
      <article className="about__hero">
        <div className="hero-title">
        <motion.div 
        {...FadeInAnimSettings}>
        <h1>Connecting Yacht Enthusiasts</h1>
        <p>We are a yacht brokerage firm dedicated to helping yacht owners and buyers navigate the seas of transactions.</p>
        </motion.div>
      </div>
      </article>

    <div className="wrapper">
      <article className="about__team">
        <motion.div 
        className="team-title"
            {...FadeInAnimSettings}
        >
          <p>Experienced</p>
          <h2>Meet Our Team</h2>
          <div className="subtitle">Get to know the experts behind our yacht brokerage firm.</div>
          <AnchorIcon />
        </motion.div>

        <div className="team-members">
        {teamData.map((memeber, index) => <TeamMember key={index} memberInfo={memeber} />)}
          
        </div>
      </article>
      </div>

      <article className="about__section1">
        <div className="wrapper">
          <div className=" sectionLayout">

            <motion.div
              className="sectionContentLayout about-content"
              {...FadeInAnimSettings}
            >
              <h2>Our Firm's History and Achievements</h2>
              <p>With over 20 years of experience, our yacht brokerage firm has established itself as a leader in the industry. We have successfully facilitated countless smooth transactions for yacht owners and buyers, earning a reputation for excellence and trust.</p>

              <Link to="/contact"><p><span className='linkText'>Contact Us&nbsp; &gt;</span></p></Link>

            </motion.div>

            <div className="about-image">
              <img src="/about2.jpg" alt="A boat image" />
            </div>
        
          </div>
        </div>

      </article>


    </main>
  )
}

export default About
