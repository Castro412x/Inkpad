import React from "react";

function Loader({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-primary
          border-t-transparent
          animate-spin
        `}
      />

      {text && (
        <p className="text-sm text-slate-500 font-medium">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

export default Loader;