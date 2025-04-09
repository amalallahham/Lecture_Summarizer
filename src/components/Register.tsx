import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });


      console.log(response);

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || 'Registration failed');
      // }

      // setSuccess('Registration successful! You can now log in.');
      // setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="container m-5 text-white">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-5 primary-bck shadow-sm rounded-5">
            <h3 className="mb-3 text-center extraBold font-size-30px text-white">
              Create Your Free Account
            </h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="my-3">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <button type="submit" className="btn primary-button bck-light-dark w-100">
                Register
              </button>
            </form>

            <p className="mt-3 text-center">
              Already have an account? <a href="/login" className='text-white'>Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
