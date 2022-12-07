import { useNavigate, useParams } from 'react-router-dom'
import { genderOptions } from '../../../constants/options'
import environment from '../../../environment'

interface IProps {
};

const Demo = (props: IProps) => {
  const navigate = useNavigate()
  const { userId } = useParams() // get params from url

  return <div className="dev-container">

    <div>Dev - Demo Page</div>

    <hr />
    <div>
      <h3>開發環境</h3>
      <ul>
        <li>env: {environment.appEnv}</li>
        <li>mode: {environment.appMode}</li>
      </ul>
    </div>

    <hr />
    <div>
      <h3>使用導航</h3>
      user id from url: {userId}
      <br />
      <input type="button" value="go to /dev/demo/user01" onClick={() => { navigate('/dev/demo/user01') }} />
      <br />
      <input type="button" value="go to /dev/demo/user02" onClick={() => { navigate('/dev/demo/user02') }} />
    </div>

    <hr />
    <div>
      <h3>使用options常數產生選單</h3>
      <select name="gender" id="gender">
        {genderOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>

  </div>
}

export default Demo
