import { MdOutlineAnchor } from "react-icons/md";
import './anchorIcon.scss'

const AnchorIcon = () => {
  return (
      <div className="iconContainer">
          <div className="line"></div>
          <MdOutlineAnchor className="anchor-icon" />
          <div className="line"></div>
      </div>
  )
}

export default AnchorIcon