import React from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Ellipsis, Heart, MessageCircle, Bookmark } from "lucide-react"

const PostCard = () => {
  const { user } = useAuth()
  const router = useRouter()
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-3">
          <Image
            src={user?.photoURL || "/profile.png"}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
          <h1 className="font-bold text-sm">{user?.username}</h1>
        </div>
        <button>
          <Ellipsis size={20} />
        </button>
      </div>
      <Image
        src="/pic.png"
        width={500}
        height={500}
        alt="post"
        className="w-full aspect-[4/5] object-cover"
      />
      <div className="py-3 px-4">
        <div className="flex items-center gap-4 mb-3">
          <button>
            <Heart size={25} />
          </button>
          <button>
            <MessageCircle size={25} />
          </button>
          <button className="ml-auto">
            <Bookmark />
          </button>
        </div>
        <p className="text-sm font-semibold mb-2">4 likes</p>
        <div>
          <span className="font-bold text-sm">{user?.username}</span>{" "}
          <span className="text-sm">comment</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard
