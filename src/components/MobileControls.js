import React from "react";

function MobileControls({
  onLeftPress,
  onLeftRelease,
  onRightPress,
  onRightRelease,
}) {
  return (
    <div className="fixed bottom-4 w-full flex justify-around z-[101]">
      <button
        onTouchStart={onLeftPress}
        onTouchEnd={onLeftRelease}
        onMouseDown={onLeftPress}
        onMouseUp={onLeftRelease}
        className="bg-white bg-opacity-30 hover:bg-opacity-50 border-none rounded-full w-20 h-20 text-4xl text-white select-none"
      >
        ⏪
      </button>
      <button
        onTouchStart={onRightPress}
        onTouchEnd={onRightRelease}
        onMouseDown={onRightPress}
        onMouseUp={onRightRelease}
        className="bg-white bg-opacity-30 hover:bg-opacity-50 border-none rounded-full w-20 h-20 text-4xl text-white select-none"
      >
        ⏩
      </button>
    </div>
  );
}

export default MobileControls;
