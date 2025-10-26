import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout"; // Ignoring this path as requested
import { useAuth } from "../../context/auth"; // Ignoring this path as requested
import styled from "styled-components"; // 1. Imported styled-components

const Login = () => {
  // All your existing logic, state, and context hooks are preserved
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const user = await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to sign in. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* 2. Replaced the Tailwind div with the StyledWrapper and uiverse card structure */}
      <StyledWrapper>
        <div className="card">
          <div className="card2">
            {/* 3. Kept your form handler, but used uiverse class */}
            <form className="form" onSubmit={handleSubmit}>
              
              {/* 4. Used your content with uiverse styling */}
              <p id="heading">Welcome Back</p>
              <p style={{
                  color: "#aaa",
                  textAlign: 'center',
                  marginTop: '-1.5em',
                  marginBottom: '1em',
                  fontSize: '0.9em'
                }}>
                Enter your email and password to access your account.
              </p>
              
              {/* 5. Kept your error logic, styled to fit the dark theme */}
              {error && (
                <p style={{
                    color: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    padding: '0.8em',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontSize: '0.9em'
                  }}>
                  {error}
                </p>
              )}

              {/* 6. Used uiverse field structure, but connected to your state */}
              <div className="field">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height={16}
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                </svg>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {/* 7. Used uiverse field structure, but connected to your state */}
              <div className="field">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height={16}
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* 8. Added your "Remember Me" content, styled to fit */}
              <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: '0.5em',
                  fontSize: '0.9em'
                }}>
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#d3d3d3',
                    cursor: 'pointer'
                  }}>
                  <input type="checkbox" style={{ cursor: 'pointer' }} /> Remember Me
                </label>
              </div>

              {/* 9. Used uiverse button layout, but connected to your logic */}
              <div className="btn">
                <button
                  type="submit"
                  className="button1"
                  disabled={loading}
                >
                  {/* Your loading state logic */}
                  {loading ? "Logging In..." : "Log In"}
                </button>
                <button
                  type="button" // Set type to prevent form submission
                  className="button2"
                  onClick={() => navigate("/register")} // Your navigation logic
                >
                  Register
                </button>
              </div>
              <button
                type="button" // Set type to prevent form submission
                className="button3"
                onClick={() => { /* You can add navigation to forgot password page here */ }}
              >
                Forgot Password?
              </button>
            </form>
          </div>
        </div>
      </StyledWrapper>
    </AuthLayout>
  );
};

// 10. Copied the entire StyledWrapper from the uiverse code
const StyledWrapper = styled.div`
  /* Added display/flex properties to center the card */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Make it full height */
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 0.4em;
    background-color: #171717;
    border-radius: 25px;
    transition: 0.4s ease-in-out;
  }

  .card {
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    border-radius: 22px;
    transition: all 0.3s;
  }

  .card2 {
    border-radius: 0;
    transition: all 0.2s;
    background-color: #171717; /* Added background to card2 */
    border-radius: 20px; /* Applied border-radius directly */
  }

  .card2:hover {
    transform: scale(0.98);
    /* border-radius: 20px; (Moved to default state) */
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
  }

  #heading {
    text-align: center;
    margin: 2em;
    color: rgb(255, 255, 255);
    font-size: 1.2em;
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background-color: #171717;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .input-icon {
    height: 1.3em;
    width: 1.3em;
    fill: white;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
    font-size: 1em; /* Added font-size */
  }

  .form .btn {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 2.5em;
  }

  .button1 {
    padding: 0.5em;
    padding-left: 1.1em;
    padding-right: 1.1em;
    border-radius: 5px;
    margin-right: 0.5em;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
    cursor: pointer; /* Added cursor */
  }

  /* Added disabled state styling */
  .button1:disabled {
    background-color: #111;
    color: #555;
    cursor: not-allowed;
  }

  .button1:hover:not(:disabled) {
    background-color: black;
    color: white;
  }

  .button2 {
    padding: 0.5em;
    padding-left: 2.3em;
    padding-right: 2.3em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
    cursor: pointer; /* Added cursor */
  }

  .button2:hover {
    background-color: black;
    color: white;
  }

  .button3 {
    margin-bottom: 3em;
    padding: 0.5em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
    cursor: pointer; /* Added cursor */
  }

  .button3:hover {
    background-color: red;
    color: white;
  }
`;

export default Login;