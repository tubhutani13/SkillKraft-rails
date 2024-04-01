import Carousel from "../Carousel/Carousel"
import InvitationSmall from "../Invitation/InvitationSmall"

const People= ({ users }) => {
return (       <div>
  <InvitationSmall/>
  <Carousel recommendedUsers={users}></Carousel>
</div>)
}

export default People
