import Link from "next/link";

const SecondaryButton = ({
  role,
  href,
  label,
  disabled,
  type,
  onClick,
  className,
}) => {
  return (
    <>
      {role === "button" ? (
        <button
          type={type}
          className={`${className} inline-flex items-center justify-center h-9 py-1 px-6 rounded-md border border-slate-500 hover:bg-slate-100 duration-100 disabled:brightness-90 disabled:pointer-events-none`}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </button>
      ) : (
        <Link
          className={`${className} inline-flex items-center justify-center h-9 py-1 px-6 rounded-md border border-slate-500 hover:bg-slate-100 duration-100`}
          href={href}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default SecondaryButton;
