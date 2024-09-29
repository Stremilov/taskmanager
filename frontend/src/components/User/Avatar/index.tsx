import { FC } from "react";

const Avatar: FC<{ size?: number }> = ({ size = 50 }) => {
  const link = null;

  return (
    <>
      {link ? (
        <img src="#" alt="user avatar" width={size} height={size} />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size * 2} ${size * 2}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={size}
            cy={size}
            r={size}
            width={size}
            height={size}
            fill={"gray"}
          ></circle>
        </svg>
      )}
    </>
  );
};

export default Avatar;
