import { Spinner } from "@nextui-org/react"
import type React from "react"

export function LoadingComponent({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner
        label={label || "Loading..."}
        color="secondary"
        labelColor="secondary"
      />
    </div>
  )
}

/**
 * Dims its parent div by casting a gray background and shows a loading spinner
 * Important: parent div must have class relative
 */
export const LoadingWrapper = ({ isLoading }: { isLoading: boolean }) => {
  return (
    isLoading && (
      <div className="absolute inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center">
        <Spinner size="md" color="secondary" />
      </div>
    )
  )
}
