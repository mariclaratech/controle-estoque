import { FaBoxOpen } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/auth";

export default function Header({ darkMode, setDarkMode, user }) {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm text-slate-500">{user.email}</span>}

        {user ? (
          <button
            onClick={logout}
            className="text-red-500 font-semibold hover:text-red-600 transition cursor-pointer text-sm"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="text-pink-500 font-semibold hover:text-pink-600 transition cursor-pointer"
          >
            Entrar
          </button>
        )}
      </div>

      <div className="flex justify-end mb-4 cursor-pointer">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-pink-500 hover:scale-105 transition cursor-pointer"
        >
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold flex items-center justify-center gap-2">
          <FaBoxOpen className="text-pink-500" /> Gestão de Estoque
        </h1>

        <p className="text-gray-500 mt-2">
          Gerencie seu estoque de forma simples e eficiente
        </p>
      </div>

      {showLogin && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            darkMode ? "bg-black/60" : "bg-black/40"
          }`}
        >
          <div
            className={`p-6 rounded-xl w-80 shadow-lg transition-colors ${
              darkMode ? "bg-slate-900 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">Login Admin</h2>

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mb-2 p-2 rounded border outline-none transition ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            />

            <input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full mb-4 p-2 rounded border outline-none transition ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            />

            <div className="flex justify-between gap-2">
              <button
                onClick={() => setShowLogin(false)}
                className={`w-full p-2 rounded transition ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Cancelar
              </button>

              <button
                onClick={login}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white p-2 rounded"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
