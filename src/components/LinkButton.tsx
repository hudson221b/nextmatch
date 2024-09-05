import { Button, Link } from "@nextui-org/react"

type Props = {
  text: string
  href: string
}
export default function LinkButton({ href, text }: Props) {
  return (
    <Button
      variant="bordered"
      color="secondary"
      size="lg"
      as={Link}
      href={href}
      className="w-[7rem]"
    >
      {text}
    </Button>
  )
}
