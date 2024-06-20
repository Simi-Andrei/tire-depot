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
          className={`${className} inline-flex items-center justify-center h-8 bg-red-700 text-white py-1 px-6 rounded-md hover:bg-red-800 duration-100 disabled:brightness-90 disabled:pointer-events-none`}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </button>
      ) : (
        <Link
          className={`${className} inline-flex items-center justify-center h-8 bg-red-700 text-white py-1 px-6 rounded-md hover:bg-red-800 duration-100`}
          href={href}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default SecondaryButton;
