import Link from "next/link";

const PrimaryButton = ({
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
          className={`${className} inline-flex items-center justify-center h-8 bg-gradient-to-b from-orange-400 via-orange-600 to-red-900 text-white py-1 px-6 rounded hover:brightness-110 duration-300 disabled:brightness-90 disabled:pointer-events-none`}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </button>
      ) : (
        <Link
          className={`${className} inline-flex items-center justify-center h-8 bg-gradient-to-b from-orange-400 via-orange-600 to-red-900 text-white py-1 px-6 rounded hover:brightness-110 duration-300`}
          href={href}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default PrimaryButton;
