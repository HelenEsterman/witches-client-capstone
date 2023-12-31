import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userExistModal = useRef();

  const handleSignIn = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          localStorage.setItem("witches_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          userExistModal.current.showModal();
        }
      });
  };

  return (
    <div className="container--login bg-login h-screen bg-cover">
      <div className="opacity-layer flex flex-col items-center justify-center pb-20">
        <dialog className="dialog dialog--auth" ref={userExistModal}>
          <div>User does not exist</div>
          <button
            className="button--close"
            onClick={() => userExistModal.current.close()}
          >
            Close
          </button>
        </dialog>

        <section>
          <h1 className="login-header font-custom text-9xl  text-emerald-500 black-text-shadow mb-3 mt-6">
            Witches Cabinet
          </h1>
          <form className="form--login max-w-md mx-auto text-center">
            <h2 className="sign-in-input text-4xl mb-10 font-custom  text-white black-text-shadow">
              Please sign in
            </h2>
            <fieldset className="email-fieldset mb-4 font-custom text-xl ">
              <label
                htmlFor="inputEmail"
                className="email-label mr-6 text-2xl text-white"
              >
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="inputEmail"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                placeholder="example@email.com"
              />
            </fieldset>
            <fieldset className="mb-20 font-custom text-xl">
              <label
                htmlFor="inputPassword"
                className="email-label mr-6 text-2xl text-white"
              >
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                placeholder="Password"
              />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                className="button pb-5 rounded-3xl bg-indigo-950 font-custom text-2xl w-28 h-10 mb-10"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </section>
        <div className="loginLinks">
          <section className="link--register">
            <Link
              className="underline text-white hover:text-emerald-500 visited:text-indigo-400 font-custom text-3xl"
              to="/register"
            >
              Not a member yet?
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
