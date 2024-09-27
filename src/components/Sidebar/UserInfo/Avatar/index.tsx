const Avatar = () => {
  const link = null;

  return (
    <>
      {link ? (
        <img src="#" alt="user avatar" width={50} height={50} />
      ) : (
        <svg
          width={50}
          height={50}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="50"
            width={50}
            height={50}
            fill={"gray"}
          ></circle>
        </svg>
      )}
    </>
  );
};

export default Avatar;
