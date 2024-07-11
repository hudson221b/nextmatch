import { EditForm } from "@/app/members/edit/EditForm"
import { CardHeader, Divider, CardBody, CardFooter } from "@nextui-org/react"
import { HeadManagerContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints"
import React, { type ReactNode } from "react"

type Props = {
  header: ReactNode | string
  body: ReactNode
  footer?: ReactNode
}

export default function CardInnerWrapper({ header, body, footer }: Props) {
  return (
    <>
      <CardHeader>
        {typeof header === "string" ? (
          <div className="text-2xl font-semibold text-secondary"> {header}</div>
        ) : (
          header
        )}
      </CardHeader>
      <Divider />
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>footer</CardFooter>}
    </>
  )
}
