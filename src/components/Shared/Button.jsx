export const Button = ({ className, text, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`bg-primary px-5 py-2 rounded-2xl text-white cursor-pointer hover:shadow-2xl duration-300 ${className}`}
      >
        {text}
      </button>
    </div>
  );
};
