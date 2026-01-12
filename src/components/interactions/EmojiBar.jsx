import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../db/instant";
import { useAppStore } from "../../store/useAppStore";

const DEFAULT_EMOJIS = ["❤️", "🔥", "👍"];

export default function EmojiBar({ imageId }) {
  const user = useAppStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const [pickerPos, setPickerPos] = useState({ x: 0, y: 0 });
  const pickerRef = useRef(null);

  const { data } = db.useQuery({
    reactions: {
      $: { where: { imageId } }
    }
  });

  const react = (emoji) => {
    const id = crypto.randomUUID();

    db.transact(
      db.tx.reactions[id].update({
        imageId,
        emoji,
        user,
        createdAt: Date.now()
      })
    );

    setOpen(false);
  };

  const openPicker = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPickerPos({
      x: rect.left,
      y: rect.top - 360
    });
    setOpen(true);
  };

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <>
      <div className="flex items-center gap-2">
        {DEFAULT_EMOJIS.map((em) => (
          <button key={em} onClick={() => react(em)} className="text-lg">
            {em}
          </button>
        ))}

        <button onClick={openPicker} className="text-lg">
          ➕
        </button>

        <span className="text-xs text-gray-300 ml-1">
          {data?.reactions?.length || 0}
        </span>
      </div>

      {open &&
        createPortal(
          <div
            ref={pickerRef}
            className="fixed z-[9999]"
            style={{
              left: pickerPos.x,
              top: pickerPos.y
            }}
          >
            {/* ❌ optional close button */}
            <div className="flex justify-end mb-1">
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <EmojiPicker
              theme="dark"
              onEmojiClick={(e) => react(e.emoji)}
            />
          </div>,
          document.body
        )}
    </>
  );
}
