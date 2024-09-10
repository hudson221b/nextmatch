"use client"
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  Image,
} from "@nextui-org/react"
import type { Photo } from "@prisma/client"
import { CldImage } from "next-cloudinary"

type Props = {
  photo: Photo
}

/**
 * A square wrapper for member's photos. Clicking on it will show the original photo in a modal.
 */
export default function MemberPhoto({ photo }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <div onClick={onOpen}>
        {photo.publicId ? (
          <CldImage
            alt="member photo"
            src={photo.publicId}
            crop="fill"
            gravity="faces"
            width={220}
            height={220}
            className="rounded-[14px]"
          />
        ) : (
          <Image
            src={photo?.url || "/images/user.png"}
            alt="member photo"
            width={220} // must be the same as CldImage width!
            className="object-cover aspect-square"
          />
        )}
      </div>
      {/* To give users the opportunity to view as much as possible from photos, we will fit the original photo inside a modal that's the size of the whole viewport */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        classNames={{ body: "overflow-auto items-center" }}
      >
        <ModalContent>
          {(_onClose) => (
            <ModalBody>
              {photo.publicId ? (
                <CldImage
                  alt="member photo"
                  src={photo.publicId!}
                  width={1280}
                  height={720}
                  crop="mpad"
                />
              ) : (
                <Image
                  src={photo?.url || "/images/user.png"}
                  alt="member photo"
                  radius="none"
                />
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
