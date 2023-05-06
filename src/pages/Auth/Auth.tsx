import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../core/store/hooks/useAppDispatch';
import { login } from '../../core/store/slices/authSlice';

const Auth = () => {
	const [username, setUsername] = useState('');
	const [error, setError] = useState(false);
	const dispatch = useAppDispatch();

	const formSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		setError(false);
		if (!username) {
			setError(true);
			return;
		}
		dispatch(login(username));
		localStorage.setItem('token', username);
	};

	return (
		<div className='auth-container'>
			<h1>Books App</h1>
			<form className='auth-form' onSubmit={formSubmitHandler}>
				<div className='form-control'>
					<label htmlFor='username'>Username</label>
					<input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<button>Login</button>
			</form>
			{error && <p style={{ color: 'red' }}>Please enter a username.</p>}
		</div>
	);
};

export default Auth;
