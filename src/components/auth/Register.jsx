import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAvatars } from "../../data/avatarData";

export const Register = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [password, setPassword] = useState("");
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
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={userExistModal}>
        <div>User already exist</div>
        <button
          className="button--close"
          onClick={() => userExistModal.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="text-4xl mt-7 mb-3">{`[witch capstone name TBD]`}</h1>
          <h2 className="text-xl mb-10">Register new account</h2>
          <fieldset className="mb-4">
            <label htmlFor="firstName"> First name </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="form-control"
              placeholder="First Name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="form-control"
              placeholder="Last Name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail"> Email </label>
            <input
              type="email"
              id="inputEmail"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              className="form-control"
              placeholder="example@email.com"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputNickname"> Nickname </label>
            <input
              type="nickname"
              id="inputNickname"
              value={nickname}
              onChange={(evt) => setNickname(evt.target.value)}
              className="form-control"
              placeholder="Nickname"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputCoven"> Coven </label>
            <input
              type="coven"
              id="inputCoven"
              value={coven}
              onChange={(evt) => setCoven(evt.target.value)}
              className="form-control"
              placeholder="Coven"
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col items-center">
            <label className="fieldset-label mb-2">Choose an Avatar</label>
            <div className="flex flex-wrap justify-center">
              {avatars.map((avatar) => (
                <label
                  key={`avatar ${avatar.id}`}
                  className="avatar-container basis-30 mb-4 mx-2"
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
                    onClick={(e) => setSelectedAvatar(parseInt(e.target.id))}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
};
