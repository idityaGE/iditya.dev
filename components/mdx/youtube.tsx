import React from "react";

export const YouTube = ({ id }: { id: string }) => {
  return (
    <div className="pb-4">
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          maxWidth: "100%",
          background: "#000",
          borderRadius: "8px",
          margin: "1rem 0",
        }}
      >
        <iframe
          title="YouTube video"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; muted"
          allowFullScreen
        />
      </div>
    </div>
  );
};
