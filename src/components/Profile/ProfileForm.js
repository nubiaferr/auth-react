import {useRef, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef()

  const {token} = useContext(AuthContext)

  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredNewPassword = newPasswordRef.current.value

    if (enteredNewPassword.length === 0) return

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBllVbfNTUfGPL5DR2jr1n2y5Du915tMSk',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        (res) => {
          history.replace('/')
        }
      )

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
