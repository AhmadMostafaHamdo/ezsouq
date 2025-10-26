import { memo, useEffect, useRef } from "react";

const EditableComment = memo(({ value, onChange, onSave, isEditing }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, [isEditing]);

  return (
    <div className="flex items-center w-36 gap-2 bg-[#F0F2F5] px-3 py-2 rounded-2xl">
      <input
        type="text"
        disabled={!isEditing}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
        className="border-none bg-transparent w-full focus:outline-none text-[#050505]"
      />
      {isEditing && (
        <button
          onClick={onSave}
          className="bg-[#1877F2] text-white px-3 py-1 rounded-2xl text-sm hover:bg-[#166FE5]"
        >
          حفظ
        </button>
      )}
    </div>
  );
});
export default EditableComment;
