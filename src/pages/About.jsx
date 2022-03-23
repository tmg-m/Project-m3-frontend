import UserIcon from '../components/userIcon';
import '../css/about.css'

function About () {
  return (
    <>
      <div className="about-container">
        <UserIcon />
        <div className="about-controller">
          <h1>Work App</h1>
          <p>This app is designed and developed for students or professionals who may be facing problems/issues with their given subjects or are trying to solve rising problems as a community.
          </p>
          <p>Created by <span>Mahendra</span></p>
          <p> Github : /tmg-m</p>
        </div>
      </div>
    </>
  )
}

export default About;