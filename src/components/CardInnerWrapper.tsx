import { EditForm } from "@/app/members/edit/EditForm"
import { CardHeader, Divider, CardBody, CardFooter } from "@nextui-org/react"
import { HeadManagerContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints"
import React, { type ReactNode } from "react"

type Props = {
  header: ReactNode | string
  body: ReactNode
  footer?: ReactNode
  classNames?: {
    header?: string
    body?: string
    footer?: string
  }
}

export default function CardInnerWrapper({
  header,
  body,
  footer,
  classNames,
}: Props) {
  const headerClassName = "" + classNames?.header
  const bodyClassName = "" + classNames?.body
  const footerClassName = "" + classNames?.footer
  return (
    <>
      <CardHeader className={headerClassName}>
        {typeof header === "string" ? (
          <div className="text-2xl font-semibold text-secondary"> {header}</div>
        ) : (
          header
        )}
      </CardHeader>
      <Divider />
      <CardBody className={bodyClassName}>{body}</CardBody>
      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </>
  )
}
