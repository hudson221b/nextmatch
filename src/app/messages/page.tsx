import React from "react"
import MessageSidebar from "./MessageSidebar"

const Messagespage: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">message table</div>
    </div>
  )
}
export default Messagespage
