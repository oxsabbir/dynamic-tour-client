export default function Container({ children, className }) {
  return (
    <>
      <div className={`container px-4 lg:px-8 2xl:px-0 ${className}`}>
        {children}
      </div>
    </>
  );
}
