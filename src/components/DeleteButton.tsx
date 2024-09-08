"use client"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react"
import { useCallback, useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { PiSpinner } from "react-icons/pi"

type Props = {
  showModal?: boolean
  modalText?: string
  headerText?: string
  size: number
  onDelete: () => void
}

/**
 * An icon only delete button.
 */
export function DeleteButton({
  showModal = false,
  modalText,
  headerText,
  size,
  onDelete,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onButtonClick = useCallback(async () => {
    if (showModal) {
      onOpen()
    } else {
      setIsDeleting(true)
      await onDelete()
      setIsDeleting(false)
    }
  }, [showModal, onDelete])

  const onConfirm = useCallback(async () => {
    await onDelete()
    setIsDeleting(false)
  }, [onDelete])

  return (
    <>
      <div className="opacity-60 hover:opacity-90" onClick={onButtonClick}>
        {!isDeleting ? (
          <AiOutlineDelete size={size} className="fill-red-600" />
        ) : (
          <PiSpinner size={size} className="fill-white animate-spin" />
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        isDismissable={true}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {headerText}
              </ModalHeader>
              <ModalBody>
                <p>{modalText}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" variant="light" onPress={onConfirm}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
