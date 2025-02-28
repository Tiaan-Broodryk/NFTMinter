import { type RecordId } from "surrealdb";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { Button } from "~/atoms";

export type GalleryImage = {
  id: string;
  image_url: string;
  Order: number;
  listing_id: string;
};
export function Gallery3(props: {
  images: GalleryImage[];
  onReorder: (images: GalleryImage[]) => void;
  onDelete: (image: GalleryImage) => void;
}) {
  return (
    <div className="mb-5  mt-5 grid grid-cols-2 flex-wrap gap-1 rounded-md bg-neutral-100 p-2 md:grid-cols-4">
      {props.images
        .sort((a, b) => (a.Order < b.Order ? -1 : 1))
        .map((image, index) => {
          return (
            <div
              key={image.id.toString()}
              className="group relative flex h-32 md:h-52"
            >
              <Image
                src={image.image_url}
                alt={""}
                width={500}
                height={500}
                className="rounded  object-cover"
              />
              <Button
                className="absolute right-1 top-1 size-6 rounded-full bg-red-500 p-1 text-white opacity-0 transition hover:text-gray-300 group-hover:opacity-100"
                onClick={() => {
                  props.onDelete(image);
                }}
              >
                <FaTimes />
              </Button>
              {index > 0 && (
                <Button
                  className="absolute bottom-0 left-0 m-1 size-7 rounded-full border bg-neutral-800 text-white opacity-0 transition hover:text-gray-500 group-hover:opacity-100"
                  onClick={() => {
                    const neworder = [];
                    const imgs = props.images.map((image_b, index_b) => {
                      let order = index_b;
                      if (image_b.id === image.id) {
                        order = index_b - 1;
                      }
                      if (index_b === index - 1) {
                        order = index;
                      }
                      return {
                        ...image_b,
                        order,
                      };
                    });
                    props.onReorder(imgs);
                  }}
                >
                  <FaArrowLeft />
                </Button>
              )}
              {index < props.images.length - 1 && (
                <Button
                  className="absolute bottom-0 right-0 m-1 size-7 rounded-full border bg-neutral-800 text-white opacity-0 transition hover:text-gray-500 group-hover:opacity-100"
                  onClick={() => {
                    const neworder = [];
                    const imgs = props.images.map((image_b, index_b) => {
                      let order = index_b;
                      if (image_b.id === image.id) {
                        order = index_b + 1;
                      }
                      if (index_b === index + 1) {
                        order = index;
                      }
                      return {
                        ...image_b,
                        order,
                      };
                    });
                    props.onReorder(imgs);
                  }}
                >
                  <FaArrowRight />
                </Button>
              )}
            </div>
          );
        })}
    </div>
  );
}
