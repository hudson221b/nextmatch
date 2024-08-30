import {
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Card,
} from "@nextui-org/react"
import React, { type ReactNode } from "react"
import type { IconType } from "react-icons"

type Props = {
  header: ReactNode | string
  body: ReactNode
  footer?: ReactNode
}
export  function CardInnerWrapper({ header, body, footer }: Props) {
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
      {footer && <CardFooter>{footer}</CardFooter>}
    </>
  )
}

type CardWrapperProps = {
  headerIcon?: IconType
  headerText?: string
  subheaderText?: string
  body?: ReactNode
  footer?: ReactNode
}

/**
 * A stand-alone wrapper to display a single card on some routes, usually informational or contains simple actions. 
 */
export const CardWrapper = ({
  headerIcon: Icon,
  headerText,
  subheaderText,
  body,
  footer,
}: CardWrapperProps) => {
  return (
    <div className="flex items-center justify-start vertical-center">
      <Card className="w-2/5 mx-auto p-5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-secondary">
            <div className="flex flex-row items-center gap-3">
              {Icon && <Icon size={30} />}
              {headerText && (
                <h1 className="text-3xl font-semibold">{headerText}</h1>
              )}
            </div>
            {subheaderText && (
              <p className="text-neutral-500">{subheaderText}</p>
            )}
          </div>
        </CardHeader>
        {body && <CardBody>{body}</CardBody>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  )
}
