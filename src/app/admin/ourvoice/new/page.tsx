import OurVoiceForm from '@/components/admin/OurVoiceForm'
import { DisplaySM } from '@/components/Typography'

export default function NewOurVoicePage() {
  return (
    <div>
      <DisplaySM weight="semibold" className="text-[#101828] mb-6">
        New Post
      </DisplaySM>
      <OurVoiceForm mode="create" />
    </div>
  )
}
