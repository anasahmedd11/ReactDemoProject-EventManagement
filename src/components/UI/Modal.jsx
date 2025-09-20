export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <dialog
        className="relative bg-gray-100 border-0 rounded-xl p-8 max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto shadow-2xl m-0"
        open
      >
        {children}
      </dialog>
    </div>
  );
}
