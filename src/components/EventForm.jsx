import { useState } from "react";

import ImagePicker from "./UI/ImagePicker.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchSelectableImages } from "../util/http";
import ErrorBlock from "./UI/ErrorBlock.jsx";

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event-images"],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold text-sm uppercase text-gray-700 tracking-wide">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="bg-white border border-gray-300 rounded-md px-3 py-3 text-base text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          defaultValue={inputData?.title ?? ""}
        />
      </div>

      {isPending && <p className="text-gray-500 italic">Loading images...</p>}
      {isError && <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch images"} />}
      {data && (
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm uppercase text-gray-700 tracking-wide">Select an Image</label>
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-semibold text-sm uppercase text-gray-700 tracking-wide">Description</label>
        <textarea
          id="description"
          name="description"
          className="bg-white border border-gray-300 rounded-md px-3 py-3 text-base text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y min-h-[100px]"
          defaultValue={inputData?.description ?? ""}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-semibold text-sm uppercase text-gray-700 tracking-wide">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="bg-white border border-gray-300 rounded-md px-3 py-3 text-base text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            defaultValue={inputData?.date ?? ""}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="time" className="font-semibold text-sm uppercase text-gray-700 tracking-wide">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            className="bg-white border border-gray-300 rounded-md px-3 py-3 text-base text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            defaultValue={inputData?.time ?? ""}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="font-semibold text-sm uppercase text-gray-700 tracking-wide">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          className="bg-white border border-gray-300 rounded-md px-3 py-3 text-base text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          defaultValue={inputData?.location ?? ""}
        />
      </div>

      <div className="flex justify-end gap-4 mt-4">{children}</div>
    </form>
  );
}
