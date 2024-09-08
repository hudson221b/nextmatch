import { getMemberPhotosByUserId } from "@/app/actions/memberActions"
import { CardInnerWrapper } from "@/components/CardWrappers"
import MemberPhoto from "@/components/MemberPhoto"



export default async function PhotosPage({
  params,
}: {
  params: { memberId: string }
}) {
  const photos = await getMemberPhotosByUserId(params.memberId)

  const body = (
    <div className="grid grid-cols-5 gap-3">
      {photos
        ? photos.map(photo => <MemberPhoto photo={photo} key={photo.id} />)
        : null}
    </div>
  )

  return <CardInnerWrapper header="Photos" body={body} />
}
