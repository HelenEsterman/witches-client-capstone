import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAvatars } from "../../data/avatarData";

export const Register = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [coven, setCoven] = useState("");
  const userExistModal = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getAllAvatars().then((avatarArray) => {
      setAvatars(avatarArray);
    });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === verifyPassword) {
      fetch(`http://localhost:8000/register`, {
        method: "POST",
        body: JSON.stringify({
          password,
          first_name: firstName,
          last_name: lastName,
          username,
          avatar: selectedAvatar,
          coven,
          nickname,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((authInfo) => {
          if (authInfo && authInfo.token) {
            localStorage.setItem("witches_token", JSON.stringify(authInfo));
            navigate("/");
          } else {
            userExistModal.current.showModal();
          }
        });
    } else {
      window.alert(
        "Passwords do not match. Please ensure that your passwords match before proceeding."
      );
    }
  };

  return (
    <div className="container--register bg-register bg-cover bg-center">
      <div className="views opacity-layer flex flex-col items-center justify-center overflow-auto">
        <dialog className="dialog-css bg-black" ref={userExistModal}>
          <div className="text-center mt-10 mb-16 font-custom text-emerald-500 black-text-shadow text-4xl">
            An account with that email already exists.
          </div>
          <button
            className="button--close rounded-3xl bg-indigo-950 font-custom w-28 h-10 text-2xl"
            onClick={() => userExistModal.current.close()}
          >
            Close
          </button>
        </dialog>

        <section>
          <h1 className="login-header font-custom text-8xl text-emerald-500 black-text-shadow mb-3 mt-6">
            Witches Cabinet
          </h1>
          <form
            className="form--login max-w-md mx-auto text-center"
            onSubmit={handleRegister}
          >
            <h2 className="sign-in-input text-4xl mb-10 font-custom text-white black-text-shadow">
              Register new account
            </h2>
            <div className="input-container">
              <fieldset className="mb-4 font-custom text-xl">
                <label
                  htmlFor="firstName"
                  className="email-label mr-6 text-2xl text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(evt) => setFirstName(evt.target.value)}
                  className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                  placeholder="First Name"
                  required
                  autoFocus
                />
              </fieldset>
              <fieldset className="mb-4 font-custom text-xl">
                <label
                  htmlFor="lastName"
                  className="email-label mr-6 text-2xl text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(evt) => setLastName(evt.target.value)}
                  className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                  placeholder="Last Name"
                  required
                  autoFocus
                />
              </fieldset>
              <fieldset className="mb-4 font-custom text-xl">
                <label
                  htmlFor="inputEmail"
                  className="email-label mr-6 text-2xl text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  value={username}
                  onChange={(evt) => setUsername(evt.target.value)}
                  className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                  placeholder="example@email.com"
                  required
                  autoFocus
                />
              </fieldset>
              <fieldset className="mb-4 font-custom text-xl">
                <label
                  htmlFor="inputPassword"
                  className="email-label mr-6 text-2xl text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                  placeholder="Password"
                />
              </fieldset>
              <fieldset className="mb-4 font-custom text-xl">
                <label
                  htmlFor="inputVerifyPassword"
                  className="email-label mr-6 text-2xl text-white"
                >
                  Verify Password
                </label>
                <input
                  type="password"
                  id="inputVerifyPassword"
                  value={verifyPassword}
                  onChange={(evt) => setVerifyPassword(evt.target.value)}
                  className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                  placeholder="Verify Password"
                />
              </fieldset>
              <fieldset className="mb-4 font-custom text-xl">
                <label
                  htmlFor="inputNickname"
                  className="email-label mr-6 text-2xl text-white"
                >
                  Nickname
                </label>
                <input
                  type="nickname"
                  id="inputNickname"
                  value={nickname}
                  onChange={(evt) => setNickname(evt.target.value)}
                  className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black "
                  placeholder="Nickname"
                />
              </fieldset>
              <fieldset className="mb-4 font-custom text-xl">
                <label
                  htmlFor="inputCoven"
                  className="email-label mr-6 text-2xl text-white"
                >
                  Coven
                </label>
                <input
                  type="coven"
                  id="inputCoven"
                  value={coven}
                  onChange={(evt) => setCoven(evt.target.value)}
                  className="form-control rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black"
                  placeholder="Coven"
                />
              </fieldset>

              <fieldset className="mb-4 flex flex-col items-center">
                <label className="fieldset-label mb-2 font-custom text-3xl">
                  Choose an Avatar
                </label>
                <div className="flex justify-center space-x-2">
                  {avatars.map((avatar) => (
                    <label
                      key={`avatar ${avatar.id}`}
                      className="avatar-container basis-36 mb-4 flex-none"
                    >
                      <img
                        src={avatar.avatar_url}
                        alt="witch related characters"
                        id={avatar.id}
                        height={200}
                        width={200}
                        className={
                          avatar.id === selectedAvatar
                            ? "mb-2 border rounded-2xl hover:cursor-pointer  border-emerald-300 border-4"
                            : "mb-2 border rounded-2xl border-none hover:cursor-pointer hover:opacity-60"
                        }
                        onClick={(e) =>
                          setSelectedAvatar(parseInt(e.target.id))
                        }
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <fieldset>
              <button
                type="submit"
                className="button pb-5 rounded-3xl bg-indigo-950 font-custom text-2xl w-28 h-10 mb-10"
              >
                Register
              </button>
            </fieldset>
          </form>
        </section>
        <div className="loginLinks mb-14">
          <section className="link--register">
            <Link
              className="underline text-white hover:text-emerald-500 visited:text-indigo-400 font-custom text-3xl "
              to="/login"
            >
              Already have an account?
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
