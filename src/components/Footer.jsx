import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-12 py-6 border-t text-sm flex flex-col md:flex-row items-center justify-between gap-4 ${
        darkMode
          ? "border-slate-700 text-slate-300"
          : "border-slate-200 text-slate-600"
      }`}
    >
      <p>
        © {new Date().getFullYear()} Maria Clara Silva. Todos os direitos
        reservados.
      </p>

      <div className="flex gap-6 items-center">
        <a
          href="https://github.com/mariclaratech"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80"
        >
          <FaGithub size={18} />
          <span>mariclaratech</span>
        </a>

        <a
          href="https://www.linkedin.com/in/maria-clara-software/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-500 transition"
        >
          <FaLinkedin size={18} />
          <span>Maria Clara Silva</span>
        </a>
      </div>
    </footer>
  );
}
