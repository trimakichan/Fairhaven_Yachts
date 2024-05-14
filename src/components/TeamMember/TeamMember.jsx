import './teamMember.scss';
import { IoPhonePortrait } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion"
import { useFadeInAnimSettings } from '../../animations/animationHooks';


const TeamMember = ({ memberInfo }) => {
    const m = memberInfo;



    return (
        <section className='teamMember'>
            <figure className="teamMember-top">
                <img src={m.image} alt={`${m.firstName} ${m.lastName} Profile Image`} title={`${m.firstName} ${m.lastName}`} />
                <figcaption>
                    <div className='textSRoboto bold'>{m.firstName} {m.lastName} </div>
                    <div>{m.isOwner ? 'Owner' : ''}</div>
                </figcaption>
            </figure>

                 <div className="teamMember-bottom">
                <div className='textSRoboto'>{m.description}</div>
                <div className="teamMember-contactInfo">

                    <div className="icon-container" ><IoPhonePortrait className='iconStyles' /><a href={`tel:${m.cell}`}>+{m.cell}</a></div>
                    {m.email ? <div className="icon-container">
                        <MdEmail className='iconStyles' /> <a href={`mailto:${m.email}`}> {m.email}</a>
                    </div> : ''}

            </div>
            </div>
        </section>
    )
}

export default TeamMember