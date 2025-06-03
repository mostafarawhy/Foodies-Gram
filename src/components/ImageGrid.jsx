
import { useContext, useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";

import Skeleton from "./Skeleton";
import { GlobalContext } from "./context/GlobalState";
import { FaHeart } from "react-icons/fa";
import { GlobalUserContext } from "./context/UsersContext";
import useUpdateFireStore from "../hooks/useUpdateFireStore";
import Modal from "./Modal";
import useInteraction from "../hooks/useInteraction";

const ImageGrid = () => {
  const { docs, isloading } = useFirestore("images");
  const { addNewInteraction } = useInteraction();

  const { likesUpdate } = useUpdateFireStore();
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const {
    toggle,
    setLogInModalOpen,
    setSelectedImg,
    selectedImg,
    isOpen,
    setSelectedImageID,
    setUploaderId,
  } = useContext(GlobalContext);
  const { currentUser } = useContext(GlobalUserContext);
  const currentProfileId = currentUser?.id || currentUser?.sub;

  useEffect(() => {
    if (!isloading && docs.length > 0) {
      const imageUrls = docs.map((doc) => doc.url);

      preloadImages(imageUrls)
        .then(() => setIsImagesLoaded(true))
        .catch((err) => {
          console.error("Error preloading images:", err);
          setIsImagesLoaded(true);
        });
    }
  }, [docs, isloading]);

  const preloadImages = async (imageUrls) => {
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = () => {
          console.warn("Image failed to load:", url);
          resolve();  
        };
      });
    });

    await Promise.all(imagePromises);
  };

  return (
    <>
      {selectedImg && isOpen && <Modal />}
      {toggle && <div className="bg-pink w-20 h-900"></div>}

      {isloading || !isImagesLoaded ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div className="img-grid">
          {docs &&
            docs.map((doc) => (
              <div className="img-wrap relative " key={doc.id}>
                <img
                  onClick={() => {
                    setSelectedImg(doc.url);
                    setSelectedImageID(doc.id);
                    setUploaderId(doc.UploadUserId);
                  }}
                  src={doc.url}
                  alt="uploaded pic"
                />

                <div className="bg-gradient-to-b from-transparent to-black  absolute bottom-0 left-0 right-0 transparent text-pink-100 p-2.5 flex items-center justify-between">
                  <FaHeart
                    className={`text-2xl transition-transform cursor-pointer ${
                      currentUser && doc.interactedAccounts[currentProfileId]
                        ? "text-custom3"
                        : "text-custom4"
                    } hover:scale-125 hover:text-custom3`}
                    style={{ padding: "2px" }}
                    onClick={() => {
                      if (!currentUser) {
                        setLogInModalOpen(true);
                      } else {
                    
                        likesUpdate(doc.id, currentProfileId);
                        addNewInteraction(
                          doc.UploadUserId,
                          currentUser,
                          "like",
                          doc.url
                        );
                    
                      }
                    }}
                  />

                  <div className="text-xs tracking-wider">
                    {doc.likes} Likes
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ImageGrid;
