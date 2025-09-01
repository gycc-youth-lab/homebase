import { notFound } from 'next/navigation'

async function getProfile(username: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${username}`)

  if (!res.ok) {
    if (res.status === 404) {
      notFound()
    }
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username)

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4">
        <img src={profile.avatar_url || '/images/logo.svg'} alt={profile.username} className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {profile.posts.map((post: any) => (
            <div key={post.id} className="border p-4 rounded-lg">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
